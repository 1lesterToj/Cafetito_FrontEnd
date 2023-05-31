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
import { TransportistasComponent } from './Componentes/accounts/transportistas/transportistas.component';
import { ConsultaQrTransportistaComponent } from './Componentes/Cafetito/consulta-qr-transportista/consulta-qr-transportista.component';
import { GaritaComponent } from './Componentes/accounts/garita/garita.component';
import { ReporteriaEstadosCuentasComponent } from './Componentes/Cafetito/reporteria-estados-cuentas/reporteria-estados-cuentas.component';

const routes: Routes = [
  //here
  {
    path: 'loginpg/:origen',
    component: LoginPGComponent,
    // canActivate: [AuthGuard]

  },

  /*   {
      path: 'homePage/:permiso',
      component: HomePageComponent,
      canActivate: [AuthGuard]
    }, */
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
  },
  {
    path: 'transportistas',
    component: TransportistasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'consulta-qr-transportista/:licencia',
    component: ConsultaQrTransportistaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'garita',
    component: GaritaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reporteria-estados',
    component: ReporteriaEstadosCuentasComponent,
    canActivate: [AuthGuard]
  },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }