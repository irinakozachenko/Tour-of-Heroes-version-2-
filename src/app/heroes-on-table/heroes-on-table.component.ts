import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.type';
import { HeroService } from '../hero.service';
import { DatePipe, NgClass, NgFor } from '@angular/common';
import { ColumnConfigTable, ColumnTypeTable, SortTable } from '../table.type';

@Component({
  selector: 'app-heroes-on-table',
  imports: [NgFor, NgClass, DatePipe],
  templateUrl: './heroes-on-table.component.html',
  styleUrl: './heroes-on-table.component.css'
})
export class HeroesOnTable implements OnInit {
  ColumnTypeTable = ColumnTypeTable
  heroes: Hero[] = [];
  sortByColumn: SortTable = {
    column: 'firstName',
    desc: false
  }
  columnsConfig: ColumnConfigTable[] = [
    { name: 'id', hidden: true, type: ColumnTypeTable.Number },
    { name: 'firstName', visibleName: 'First name', type: ColumnTypeTable.String },
    { name: 'lastName', visibleName: 'Last name', type: ColumnTypeTable.String },
    { name: 'street', visibleName: 'Street', type: ColumnTypeTable.String },
    { name: 'city', visibleName: 'City', type: ColumnTypeTable.String },
    { name: 'bithDate', visibleName: 'BithDate', type: ColumnTypeTable.Date },
    { name: 'gender', visibleName: 'Gender', type: ColumnTypeTable.String },
    { name: 'email', visibleName: 'Email', type: ColumnTypeTable.String },
  ]

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes =>  {
        this.heroes = heroes
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
      const worker = new Worker(new URL('heroes-on-table.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        this.heroes = data.heroes
        console.log(`page got message: ${data}`);
      };
      worker.postMessage({heroes: this.heroes, columnName: columnName, desc: this.sortByColumn.desc});
    }
  }
}
