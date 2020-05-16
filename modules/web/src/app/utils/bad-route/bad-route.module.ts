import {NgModule} from '@angular/core';
import {BadRouteComponent} from './bad-route.component';
import {BadRouteRoutingModule} from './bad-route-routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    BadRouteComponent,
  ],
  imports: [
    CommonModule,
    BadRouteRoutingModule
  ]
})
export class BadRouteModule {
}
