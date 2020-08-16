import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BadRouteComponent} from './bad-route.component';

const routes: Routes = [
  {path: '', component: BadRouteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BadRouteRoutingModule {
}
