import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPGComponent } from './Componentes/Home/login-pg/login-pg.component';
import { HomePageComponent } from './Componentes/Home/home-page/home-page.component';
import { AuthGuard } from './security/auth.guard';
import { ParentAccountComponent } from './Componentes/accounts/parent-account/parent-account.component';
import { MenuComponent } from './Componentes/menu/menu.component';
import { RevisionSolicitudComponent } from './Componentes/Cafetito/revision-solicitud/revision-solicitud.component';
import { RevisionPesoComponent } from './Componentes/Peso-Cabal/revision-peso/revision-peso.component';
import { ValidarToleranciaComponent } from './Componentes/Cafetito/validar-tolerancia/validar-tolerancia.component';

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
,
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'revision',
    component: RevisionSolicitudComponent,
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'revision-peso',
    component: RevisionPesoComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'validar-tolerancia',
    component: ValidarToleranciaComponent,
    canActivate: [AuthGuard]
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
