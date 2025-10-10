import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.type';
import { HeroService } from '../hero.service';
import { NgClass, NgFor } from '@angular/common';
import { ColumnCongigTable } from '../table.type';

@Component({
  selector: 'app-heroes-on-table',
  imports: [NgFor, NgClass],
  templateUrl: './heroes-on-table.component.html',
  styleUrl: './heroes-on-table.component.css'
})
export class HeroesOnTable implements OnInit {
  heroes: Hero[] = [];
  sortByColumn = 'firstName'
  sortDesc = true
  columnsConfig: ColumnCongigTable[] = [
    { name: 'id', hidden: true },
    { name: 'firstName', visibleName: 'First name' },
    { name: 'lastName', visibleName: 'Last name' },
    { name: 'street', visibleName: 'Street' },
    { name: 'city', visibleName: 'City' },
    { name: 'bithDate', visibleName: 'BithDate' },
    { name: 'gender', visibleName: 'Gender' },
    { name: 'email', visibleName: 'Email' },
  ]

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes =>  this.heroes = heroes)
  }

  sort(column: ColumnCongigTable) {
    if (this.sortByColumn === column.name) {
      this.sortDesc = !this.sortDesc
    }
    else {
      this.sortByColumn = column.name
      this.sortDesc = true
    }
  }
}
