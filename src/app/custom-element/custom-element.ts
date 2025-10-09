import { Component, input, OnInit } from '@angular/core';
import { HighlightDirective } from '../highlight.directive';
import { ReversePipe } from '../reversePipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CaseEnum } from '../hero.const';

@Component({
  selector: 'app-custom-element',
  imports: [HighlightDirective, ReversePipe, ReactiveFormsModule],
  templateUrl: './custom-element.html',
  styleUrl: './custom-element.css'
})
export class CustomElement implements OnInit {
  color = "";
  word = "Test string for uppercase pipe";
  case = new FormControl(CaseEnum.Uppercase);
  testStringForCase: string = "Test string for case"
  CaseEnum = CaseEnum

  ngOnInit() {
    this.caseSelection();
  }

  caseSelection() {
    if (this.case.value === CaseEnum.Lowercase) {
      this.testStringForCase = this.testStringForCase.toLowerCase();
    } else {
      this.testStringForCase = this.testStringForCase.toUpperCase();
    }
  }
}
