import { Component, input } from '@angular/core';
import { PopupService } from '../popup.service';
import { PopupModel } from '../hero.type';

@Component({
  selector: 'app-hero-popup-cell',
  imports: [],
  templateUrl: './hero-popup-cell.component.html',
  styleUrl: './hero-popup-cell.component.css'
})
export class HeroPopupCell {
  constructor (private popupService: PopupService) {}
  
  value = input<string>("")

  openPopup() {
    const data: PopupModel = { title: 'Email', content: this.value() };
    this.popupService.openPopup(data);
  }
}
