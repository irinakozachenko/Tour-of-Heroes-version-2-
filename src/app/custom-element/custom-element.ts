import { Component, OnInit } from '@angular/core';
import { HighlightDirective } from '../highlight.directive';
import { ReversePipe } from '../reversePipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TestOutputProperty } from '../test-output-property/test-output-property';
import { LetterCaseEnum } from '../hero.type';

@Component({
  selector: 'app-custom-element',
  imports: [HighlightDirective, ReversePipe, ReactiveFormsModule, TestOutputProperty],
  templateUrl: './custom-element.html',
  styleUrl: './custom-element.less'
})
export class CustomElement implements OnInit {
  color = "";
  stringForReverse = "Test string for reverse pipe";
  letterCase = new FormControl(LetterCaseEnum.Uppercase);
  stringForLetterCase: string = "Test string for letter case"
  LetterCaseEnum = LetterCaseEnum
  items = new Array();

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
  
  addItem(item: string) {
    this.items.push(item);
  }
}
