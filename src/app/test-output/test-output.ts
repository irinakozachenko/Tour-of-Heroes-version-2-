import { Component, output } from '@angular/core';

@Component({
  selector: 'app-test-output',
  imports: [],
  templateUrl: './test-output.html',
  styleUrl: './test-output.css'
})
export class TestOutput {
  addItemEvent = output<string>()
  addItem() {
    this.addItemEvent.emit('🐢');
  }
}
