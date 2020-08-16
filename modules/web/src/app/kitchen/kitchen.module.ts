import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KitchenRoutingModule } from './kitchen-routing.module';
import { MyKitchenComponent } from './my-kitchen.component';
import { NewKitchenComponent } from './components/crud/new-kitchen.component';
import {ReactiveFormsModule} from '@angular/forms';
import { DetailKitchenComponent } from './detail-kitchen/detail-kitchen.component';


@NgModule({
  declarations: [MyKitchenComponent, NewKitchenComponent, DetailKitchenComponent],
  imports: [
    CommonModule,
    KitchenRoutingModule,
    ReactiveFormsModule
  ]
})
export class KitchenModule { }
