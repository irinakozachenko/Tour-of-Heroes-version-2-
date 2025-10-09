import { Injectable } from '@angular/core';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const heroes =  [
      { id: 12, firstName: 'Dr. Nice' },
      { id: 13, firstName: 'Bombasto' },
      { id: 14, firstName: 'Celeritas' },
      { id: 15, firstName: 'Magneta' },
      { id: 16, firstName: 'RubberMan' },
      { id: 17, firstName: 'Dynama' },
      { id: 18, firstName: 'Dr. IQ' },
      { id: 19, firstName: 'Magma' },
      { id: 20, firstName: 'Tornado' }
    ];
    return {heroes};
  }

   genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
