import { Component } from '@angular/core';
import { UIRouterModule } from "@uirouter/angular";

@Component({
  selector: 'app-root',
  imports: [UIRouterModule],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  title = 'Tour of Heroes';
}
