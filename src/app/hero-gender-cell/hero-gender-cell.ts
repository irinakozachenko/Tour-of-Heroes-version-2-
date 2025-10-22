import { Component, input } from '@angular/core';
import { HeroGenderEnum } from '../hero.type';

@Component({
  selector: 'app-hero-gender-cell',
  imports: [],
  templateUrl: './hero-gender-cell.html',
  styleUrl: './hero-gender-cell.less'
})
export class HeroGenderCell {
   value = input<string>("")
   HeroGenderEnum = HeroGenderEnum
}
