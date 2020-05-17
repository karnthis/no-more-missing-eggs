import {NgModule} from '@angular/core';
import {MeComponent} from './me.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: MeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeRoutingModule {
}
