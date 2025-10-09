import { Component, OnInit } from '@angular/core';
import { HighlightDirective } from '../highlight.directive';
import { ReversePipe } from '../reversePipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LetterCaseEnum } from '../hero.const';

@Component({
  selector: 'app-custom-element',
  imports: [HighlightDirective, ReversePipe, ReactiveFormsModule],
  templateUrl: './custom-element.html',
  styleUrl: './custom-element.css'
})
export class CustomElement implements OnInit {
  color = "";
  stringForReverse = "Test string for reverse pipe";
  letterCase = new FormControl(LetterCaseEnum.Uppercase);
  stringForLetterCase: string = "Test string for letter case"
  LetterCaseEnum = LetterCaseEnum

  ngOnInit() {
    this.letterCaseSelection();
  }

  letterCaseSelection() {
    if (this.letterCase.value === LetterCaseEnum.Lowercase) {
      this.stringForLetterCase = this.stringForLetterCase.toLowerCase();
    } else {
      this.stringForLetterCase = this.stringForLetterCase.toUpperCase();
    }
  }
}
