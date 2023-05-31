import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalAccionComponent } from 'src/app/Componentes/Cafetito/modal-accion/modal-accion.component';
import { GeneralServiceService } from 'src/app/Core/services/general-service.service';
import { GenericNotification } from 'src/app/shared/notificaciones';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-modal-qr',
  templateUrl: './modal-qr.component.html',
  styleUrls: ['./modal-qr.component.css']
})
export class ModalQrComponent implements OnInit {

  url = 'https://cafetito-front-zd5nmf9jt-1lestertoj.vercel.app/loginpg/';
  profile = '';// SIRVE PARA CONCATENAR ALGO DESPUES DE LA DIAGONAL
  elementType = NgxQrcodeElementTypes.URL;
  errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';
  jsonTemporal!: any;
  viewQR: boolean = false;
  constructor(
    private servicio: GeneralServiceService,
    private notificaciones: GenericNotification,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalAccionComponent>,
  ) { }

  async ngOnInit(): Promise<void> {
    console.log("DATOS DEL COMPONENTE ANTERIOR: ", this.dialogRef.componentInstance.data)
    this.jsonTemporal = this.dialogRef.componentInstance.data;
    console.log('--------------------- ', this.jsonTemporal);
    await this.valueQR();
  }

  async valueQR() {

    const getEncriptado$ = this.servicio.getEncriptar(this.jsonTemporal.licenciaTransportista)
    await firstValueFrom(getEncriptado$)
      .then(res => {
        this.value = this.url + res;
        console.log(this.value)
        this.viewQR = true;
      })
      .catch(err => {
        this.notificaciones.errorControlado(err);
      })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  /*   async aprobar(){
      const jsonEnviar = {
        noCuenta: this.jsonTemporal.noCuenta,
        accion: 1,
        usuario: localStorage.getItem('usuario'),
      };
      console.log('aprobar---',jsonEnviar);
      const sendData$ = this.servicio.saveAccionSolicitud(jsonEnviar);
      await firstValueFrom(sendData$)
        .then(async res => {
          await this.notificaciones.notificacionGenerica('INFORMACION ALMACENADA EXITOSAMENTE', 'success');
          this.clearFormulario();
        })
        .catch(err => {
          console.log(err);
         this.notificaciones.notificacionGenerica('INFORMACION ALMACENADA CON ERROR', 'info');
        });
    } */

  /* async rechazar(){
     const jsonEnviar = {
       noCuenta: this.jsonTemporal.noCuenta,
       accion: 2,
       usuario: localStorage.getItem('usuario'),
     };
     console.log('rechazar---',jsonEnviar);
     const sendData$ = this.servicio.saveAccionSolicitud(jsonEnviar);
     await firstValueFrom(sendData$)
       .then(async res => {
         await this.notificaciones.notificacionGenerica('INFORMACION ALMACENADA EXITOSAMENTE', 'success');
         this.clearFormulario();
       })
       .catch(err => {
         console.log(err);
        this.notificaciones.notificacionGenerica('INFORMACION ALMACENADA CON ERROR', 'info');
       });
   } */

  clearFormulario() {
    this.router.navigate(['/revision']);
  }

}