import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { NgFor } from '@angular/common';
import { HeroService } from '../hero.service';
import { UIRouterModule } from "@uirouter/angular";
import { TestOutput } from '../test-output/test-output';

@Component({
  selector: 'app-heroes',
  imports: [NgFor, UIRouterModule, TestOutput],
  templateUrl: './heroes.html',
  styleUrl: './heroes.css',
})
export class Heroes implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;
  items = new Array();

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
  }

  addHero(name: string): void {
    name = name.trim();
    if (!name) 
      return
    this.heroService.addHero({} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      })
  }

  delete(hero: Hero) {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  addItem(item: string) {
    this.items.push(item);
  }
}
