import { Component } from '@angular/core';
import { UIRouterModule } from "@uirouter/angular";
import { Messages } from './messages/messages';

@Component({
  selector: 'app-root',
  imports: [UIRouterModule, Messages],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Tour of Heroes';
}
