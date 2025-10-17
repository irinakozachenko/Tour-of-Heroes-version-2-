import { Component, OnInit } from '@angular/core';
import { Hero, PopupModel } from '../hero.type';
import { HeroService } from '../hero.service';
import { DatePipe, NgClass, NgFor, NgComponentOutlet } from '@angular/common';
import { ColumnConfigTable, ColumnTypeTable, ContextFilterTable, ContextFilterTypeTable, PagingTable, SortTable } from '../table.type';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HeroGenderCell } from '../hero-gender-cell/hero-gender-cell';
import { HeroPopupCell } from '../hero-popup-cell/hero-popup-cell.component';
import { PopupService } from '../popup.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeroGenderEnum } from '../hero.const';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-heroes-on-table',
  imports: [NgFor, NgClass, NgComponentOutlet, DatePipe, MatPaginatorModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './heroes-on-table.component.html',
  styleUrl: './heroes-on-table.component.css'
})
export class HeroesOnTable implements OnInit {
  ColumnTypeTable = ColumnTypeTable
  ContextFilterTypeTable = ContextFilterTypeTable
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
  contextFilterForm!: FormGroup
  contextFilters: ContextFilterTable[] = [
    { columnName: 'firstName', type: ContextFilterTypeTable.String },
    { columnName: 'lastName', type: ContextFilterTypeTable.String },
    { columnName: 'street', type: ContextFilterTypeTable.String },
    { columnName: 'city', type: ContextFilterTypeTable.String },
    { columnName: 'bithDate', type: ContextFilterTypeTable.Date },
    { columnName: 'gender', type: ContextFilterTypeTable.Select, options: Object.keys(HeroGenderEnum)},
    { columnName: 'email', hidden: true },
  ]

  constructor(private heroService: HeroService, private popupService: PopupService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.contextFilterForm = this.formBuilder.group({
      filters: this.formBuilder.array([])
    });
    this.contextFilters.forEach(filter => {
      this.filters.push(this.formBuilder.group({
        columnName: this.formBuilder.control(filter.columnName),
        value: this.formBuilder.control(''),
      }))
    })
    this.getHeroes();
  }

  get filters(): FormArray {
    return this.contextFilterForm.get('filters') as FormArray;
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

    this.sortTable(columnName)
  }

  private sortTable(columnName: string) {
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

  onSubmitContextFilter() {
    const contextFilterValues = this.contextFilterForm.value.filters.filter((filter: any) => filter.value)
    const searchString = contextFilterValues.map((element: any) => `${element.columnName}=${element.value}`).join("&")
    this.heroService.searchHeroes(searchString).subscribe(heroes => {
      this.heroes = heroes
      this.paging.totalItems = this.heroes.length
      this.paging.currentPage = 0
      this.sortTable(this.sortByColumn.column)
    })
  }
}
