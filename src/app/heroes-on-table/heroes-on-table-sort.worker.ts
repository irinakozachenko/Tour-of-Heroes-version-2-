/// <reference lib="webworker" />

import { Hero } from "../hero.type";

function sortByColumn(heroes: Hero[], columnName: string, desc: boolean) {
    heroes.sort((a: Hero, b: Hero) => {
      const valueA = a[columnName]!
      const valueB = b[columnName]!
      if (desc) {
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
      }
      else {
        if (valueA > valueB) return -1;
        if (valueA < valueB) return 1;
      }
      return 0;
    });
    return heroes
  }


addEventListener('message', ({ data }) => {
  const response = { heroes: sortByColumn(data.heroes, data.columnName, data.desc) };
  postMessage(response);
});
