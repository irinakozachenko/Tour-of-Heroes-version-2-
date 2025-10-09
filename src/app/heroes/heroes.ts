import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { NgFor, NgIf } from '@angular/common';
import { HeroService } from '../hero.service';
import { UIRouterModule } from "@uirouter/angular";
import { TestOutputProperty } from '../test-output-property/test-output-property';
import { InMemoryDataService } from '../in-memory-data';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-heroes',
  imports: [NgFor, UIRouterModule, TestOutputProperty, ReactiveFormsModule, NgIf],
  templateUrl: './heroes.html',
  styleUrl: './heroes.css',
})
export class Heroes implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;
  items = new Array();
  addHeroForm = new FormGroup({
    firstName: new FormControl('', Validators.required)
  })

  constructor(private heroService: HeroService, private inMemoryDataService: InMemoryDataService) {}

  ngOnInit() {
    this.getHeroes();
  }

  get firstName() {
    return this.addHeroForm.get('firstName');
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
  }

  addHero(): void {
    if (!this.addHeroForm.valid) {
      this.firstName?.markAsDirty()
      return
    }
    const newHero: Hero = { 
      id: this.inMemoryDataService.genId(this.heroes), 
      firstName:  this.firstName?.value! 
    }
    this.heroService.addHero(newHero)
      .subscribe(hero => {
        this.firstName?.setValue('')
        this.addHeroForm.reset();
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
