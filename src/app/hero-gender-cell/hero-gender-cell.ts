import { Component, input } from '@angular/core';
import { HeroGenderEnum } from '../hero.const';

@Component({
  selector: 'app-hero-gender-cell',
  imports: [],
  templateUrl: './hero-gender-cell.html',
  styleUrl: './hero-gender-cell.css'
})
export class HeroGenderCell {
   value = input<string>("")
   HeroGenderEnum = HeroGenderEnum
}
