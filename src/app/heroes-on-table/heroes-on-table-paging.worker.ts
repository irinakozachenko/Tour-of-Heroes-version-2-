/// <reference lib="webworker" />

import { Hero } from "../hero.type";
import { PagingTable } from "../table.type";

function goToPage(paging: PagingTable, heroes: Hero[]) {
  const start = paging.currentPage * paging.pageSize
  const end = start + paging.pageSize
  return heroes.slice(start, end)
}

addEventListener('message', ({ data }) => {
  const response = { paginatedHeroes : goToPage(data.paging, data.heroes) };
  postMessage(response);
});
