import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyKitchenComponent} from './my-kitchen.component';
import {NewKitchenComponent} from './components/crud/new-kitchen.component';


const routes: Routes = [
  {path: '', component: MyKitchenComponent},
  {path: 'new', component: NewKitchenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitchenRoutingModule { }
