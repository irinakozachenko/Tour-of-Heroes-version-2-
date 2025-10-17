/// <reference lib="webworker" />

import { ContextFilterOperationTable, SearchValueTable } from "../table.type"
import { Hero } from "../hero.type"


function contextFilterSubmit(contextFilter: SearchValueTable[], originalHeroes: Hero[]) {
  const contextFilterValues =  contextFilter.filter((filter: SearchValueTable) => filter.value)
  return originalHeroes.filter((item: Hero) => {
    return contextFilterValues.every((filter: SearchValueTable) => {
        const propertyValue = item[filter.columnName]?.toString().toLowerCase()
        const value = filter.value.toLowerCase()
        if (filter.operation === ContextFilterOperationTable.Equality) {
          return propertyValue && propertyValue === value;
        }
        return propertyValue && propertyValue.includes(value);
      }
    )
  })
}

addEventListener('message', ({ data }) => {
  const response = { heroes : contextFilterSubmit(data.contextFilter, data.originalHeroes) };
  postMessage(response);
});
