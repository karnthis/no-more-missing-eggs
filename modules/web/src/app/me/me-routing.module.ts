import {NgModule} from '@angular/core';
import {MeComponent} from './me.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from '../utils/auth/guards/authentication.guard';

const routes: Routes = [
  {path: '', component: MeComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeRoutingModule {
}
