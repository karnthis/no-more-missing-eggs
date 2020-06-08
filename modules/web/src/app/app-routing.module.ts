import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './utils/auth/signup/signup.component';
import {LoginComponent} from './utils/auth/login/login.component';
import {AuthenticationGuard} from './utils/auth/guards/authentication.guard';

const routes: Routes = [
  {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'kitchen', loadChildren: () => import('./kitchen/kitchen.module').then(m => m.KitchenModule), canActivate: [AuthenticationGuard]},
  {path: 'me', loadChildren: () => import('./me/me.module').then(m => m.MeModule), canActivate: [AuthenticationGuard]},
  {path: '**', loadChildren: () => import('./utils/bad-route/bad-route.module').then(m => m.BadRouteModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
