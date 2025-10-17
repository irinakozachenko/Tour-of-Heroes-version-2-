import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Hero } from '../hero.type';
import { HeroService } from '../hero.service';
import { UIRouterModule } from "@uirouter/angular";
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-hero-search',
  imports: [UIRouterModule, AsyncPipe, NgFor],
  templateUrl: './hero-search.html',
  styleUrl: './hero-search.css'
})
export class HeroSearch implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(`firstName=${term}`))
    )
  }
}
