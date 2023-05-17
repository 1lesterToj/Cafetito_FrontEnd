import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginPGComponent } from './Componentes/Home/login-pg/login-pg.component'
import { YourInterceptor } from './security/Models/interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './Componentes/Home/home-page/home-page.component';

import { FooterComponent } from './Componentes/Home/footer/footer.component';
import { NavPComponent } from './Componentes/Home/nav-p/nav-p.component';
import { VariableGlobal } from './shared/variable-global';
import { GenericTableComponent } from './shared/generic-table/generic-table.component';
import { ParentAccountComponent } from './Componentes/accounts/parent-account/parent-account.component';
import { FormCreateChildComponent } from './Componentes/accounts/form-create-child/form-create-child.component';
import { createPopper } from '@popperjs/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalParcialidadComponent } from './Componentes/accounts/modal-parcialidad/modal-parcialidad.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GenericSpinnerComponent } from './shared/generic-spinner/generic-spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPGComponent,
    HomePageComponent,
    NavPComponent,
    FooterComponent,
    GenericTableComponent,
    ParentAccountComponent,
    FormCreateChildComponent,
    ModalParcialidadComponent,
    GenericSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule
 

  ],
  providers: [
    VariableGlobal,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: YourInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
