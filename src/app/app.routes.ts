import { Heroes } from './heroes/heroes';
import { Dashboard } from './dashboard/dashboard';
import { HeroDetail } from './hero-detail/hero-detail';
import { Transition } from '@uirouter/angular';
import { CustomElement } from './custom-element/custom-element';
import { HeroesOnTable } from './heroes-on-table/heroes-on-table.component';

/*export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'heroes', component: Heroes },
    { path: 'dashboard', component: Dashboard },
    { path: 'detail/:id', component: HeroDetail },
];*/

export const routes = [
    { name: "dashboardEmpty", url: "", component: Dashboard },
    { name: "heroes", url: "/heroes", component: Heroes },
    { name: "dashboard", url: "/dashboard", component: Dashboard },
    { name: "testDirective", url: "/testDirective", component: CustomElement },
    { name: "table", url: "/table", component: HeroesOnTable },
    { 
        name: "heroDetail",
        url: "/hero/:id", 
        component: HeroDetail,
        resolve: [
            {
                token: "heroId",
                deps: [Transition],
                resolveFn: (trans: Transition) => trans.params()["id"]
            }
        ]
    },
]
