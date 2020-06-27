import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewItemComponent} from './components/crud/new-item.component';


const routes: Routes = [
  {path: 'new', component: NewItemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
