import { Injectable } from '@angular/core';
import { Hero } from './hero.type';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const heroes =  HEROES
    return {heroes};
  }

   genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
