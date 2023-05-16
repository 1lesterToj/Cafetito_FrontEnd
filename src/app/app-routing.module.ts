import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPGComponent } from './Componentes/Home/login-pg/login-pg.component';
import { HomePageComponent } from './Componentes/Home/home-page/home-page.component';
import { AuthGuard } from './security/auth.guard';
import { ParentAccountComponent } from './Componentes/accounts/parent-account/parent-account.component';

const routes: Routes = [
  //here
  {
    path: 'loginpg',
    component: LoginPGComponent,
    // canActivate: [AuthGuard]

  },

  {
    path: 'homePage/:permiso',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'accounts',
    component: ParentAccountComponent,
    canActivate: [AuthGuard]
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
