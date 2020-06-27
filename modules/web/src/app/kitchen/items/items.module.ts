import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { NewItemComponent } from './components/crud/new-item.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [NewItemComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ItemsModule { }
