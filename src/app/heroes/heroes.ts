import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.type';
import { NgFor, NgIf } from '@angular/common';
import { HeroService } from '../hero.service';
import { UIRouterModule } from "@uirouter/angular";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-heroes',
  imports: [NgFor, UIRouterModule, ReactiveFormsModule, NgIf],
  templateUrl: './heroes.html',
  styleUrl: './heroes.less',
})
export class Heroes implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;
  addHeroForm = new FormGroup({
    firstName: new FormControl('', Validators.required)
  })

  constructor(private heroService: HeroService) {}

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
    this.heroService.addHero({ firstName: this.firstName?.value! } as Hero)
      .subscribe(hero => {
        this.firstName?.setValue('')
        this.addHeroForm.reset();
        this.heroes.push(hero);
      })
  }

  delete(hero: Hero) {
    this.heroService.deleteHero(hero.id).subscribe(() => 
      this.heroes = this.heroes.filter(h => h !== hero)
    ) 
  }
}
