import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MyKitchenComponent} from './my-kitchen.component';
import {NewKitchenComponent} from './components/crud/new-kitchen.component';
import {DetailKitchenComponent} from './detail-kitchen/detail-kitchen.component';

const routes: Routes = [
  {path: '', component: MyKitchenComponent},
  {path: 'new', component: NewKitchenComponent},
  {
    path: ':id', children: [
      {path: '', component: DetailKitchenComponent},
      {path: 'item', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitchenRoutingModule {
}
