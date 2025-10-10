import { Component, input, OnInit } from '@angular/core';
import { Hero } from '../hero.type';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, UpperCasePipe, Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { UIRouterModule } from "@uirouter/angular";
import { HeroGenderEnum } from '../hero.const';
import { ageRangeValidator } from '../ageRange.validator';

@Component({
  selector: 'app-hero-detail',
  imports: [FormsModule, NgIf, UpperCasePipe, UIRouterModule, ReactiveFormsModule],
  templateUrl: './hero-detail.html',
  styleUrl: './hero-detail.css',
})
export class HeroDetail implements OnInit{
  hero?: Hero | undefined;
  heroId = input<number>(0);
  heroForm!: FormGroup
  HeroGenderEnum = HeroGenderEnum

  constructor(private heroService: HeroService, private location: Location, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    this.heroService.getHero(this.heroId())
      .subscribe(hero => {
        this.hero = hero;
        this.heroForm = this.formBuilder.group({
          firstName: [this.hero.firstName, [Validators.required, Validators.minLength(3)]],
          lastName: [this.hero.lastName],
          street: [this.hero.street],
          city: [this.hero.city],
          gender: [this.hero.gender ?? HeroGenderEnum.Male],
          email: [this.hero.email, Validators.email]
        });
      })
  }

  save(): void {
    if (this.hero && this.heroForm.valid) {
      this.hero.firstName = this.heroForm.value.firstName;
      this.hero.lastName = this.heroForm.value.lastName;
      this.hero.city = this.heroForm.value.city;
      this.hero.street = this.heroForm.value.street;
      this.hero.gender = this.heroForm.value.gender;
      this.hero.email = this.heroForm.value.email;
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  goBack() {
    this.location.back();
  }
}
