import { Component, OnInit } from '@angular/core';
import { Hero, PopupModel } from '../hero.type';
import { HeroService } from '../hero.service';
import { DatePipe, NgClass, NgFor, NgComponentOutlet } from '@angular/common';
import { ColumnConfigTable, ColumnTypeTable, PagingTable, SortTable } from '../table.type';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HeroGenderCell } from '../hero-gender-cell/hero-gender-cell';
import { HeroPopupCell } from '../hero-popup-cell/hero-popup-cell.component';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-heroes-on-table',
  imports: [NgFor, NgClass, NgComponentOutlet, DatePipe, MatPaginatorModule],
  templateUrl: './heroes-on-table.component.html',
  styleUrl: './heroes-on-table.component.css'
})
export class HeroesOnTable implements OnInit {
  ColumnTypeTable = ColumnTypeTable
  heroes: Hero[] = [];
  paginatedHeroes: Hero[] = [];
  sortByColumn: SortTable = {
    column: 'firstName',
    desc: false
  };
  paging: PagingTable = {
    pageSize: 10,
    currentPage: 0
  }
  columnsConfig: ColumnConfigTable[] = [
    { name: 'id', hidden: true, type: ColumnTypeTable.Number },
    { name: 'firstName', visibleName: 'First name', type: ColumnTypeTable.String },
    { name: 'lastName', visibleName: 'Last name', type: ColumnTypeTable.String },
    { name: 'street', visibleName: 'Street', type: ColumnTypeTable.String },
    { name: 'city', visibleName: 'City', type: ColumnTypeTable.String },
    { name: 'bithDate', visibleName: 'BithDate', type: ColumnTypeTable.Date },
    { name: 'gender', visibleName: 'Gender', type: ColumnTypeTable.Custom, component:  HeroGenderCell},
    { name: 'email', visibleName: 'Email', type: ColumnTypeTable.Custom, component: HeroPopupCell, notSortable: true },
  ]

  constructor(private heroService: HeroService, private popupService: PopupService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes =>  {
        this.heroes = heroes
        this.paging.totalItems = this.heroes.length
        this.sort(this.sortByColumn.column)
    })
  }

  sort(columnName: string) {
    if (this.sortByColumn.column === columnName) {
      this.sortByColumn.desc = !this.sortByColumn.desc
    }
    else {
      this.sortByColumn.column = columnName
      this.sortByColumn.desc = true
    }

    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('heroes-on-table-sort.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        this.heroes = data.heroes
        this.goToPage(this.paging.currentPage)
      };
      worker.postMessage({heroes: this.heroes, columnName: columnName, desc: this.sortByColumn.desc});
    }
  }

  goToPage(pageIndex: number) {
    this.paging.currentPage = pageIndex
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('heroes-on-table-paging.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        this.paginatedHeroes = data.paginatedHeroes
      };
      worker.postMessage({paging: this.paging, heroes: this.heroes});
    }
  }

  deleteHero(hero: Hero) {
    const data: PopupModel = { 
      title: 'Delete hero', 
      content: `Are you sure you want to delete "${hero.firstName}"?`, 
      submitButton: "Delete"
    };
    const dialogRef = this.popupService.openPopup(data);
     dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroService.deleteHero(hero.id).subscribe(() => {
          this.heroes = this.heroes.filter(h => h.id !== hero.id);
          this.paging.totalItems = this.heroes.length
          this.goToPage(this.paging.currentPage)
        })
      }
    });
  }
}
