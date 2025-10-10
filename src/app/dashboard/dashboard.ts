import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.type';
import { HeroService } from '../hero.service';
import { NgFor } from '@angular/common';
import { HeroSearch } from '../hero-search/hero-search';
import { UIRouterModule } from "@uirouter/angular";

@Component({
  selector: 'app-dashboard',
  imports: [UIRouterModule, NgFor, HeroSearch],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard implements OnInit {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().
      subscribe(heroes => this.heroes = heroes.slice(1,5))
  }
}
