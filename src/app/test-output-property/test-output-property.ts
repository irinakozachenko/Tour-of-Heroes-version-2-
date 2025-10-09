import { Component, output } from '@angular/core';

@Component({
  selector: 'app-test-output-property',
  imports: [],
  templateUrl: './test-output-property.html',
  styleUrl: './test-output-property.css'
})
export class TestOutputProperty {
  addItemEvent = output<string>()
  addItem() {
    this.addItemEvent.emit('🐢');
  }
}
