import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GeneralServiceService } from 'src/app/Core/services/general-service.service';
import { GenericNotification } from 'src/app/shared/notificaciones';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-accion',
  templateUrl: './modal-accion.component.html',
  styleUrls: ['./modal-accion.component.css']
})
export class ModalAccionComponent implements OnInit {
  jsonTemporal!: any;

  constructor(
    private servicio: GeneralServiceService,
    private notificaciones: GenericNotification,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalAccionComponent>,
  ) { }

  ngOnInit(): void {
    console.log("DATOS DEL COMPONENTE ANTERIOR: ", this.dialogRef.componentInstance.data)
    this.jsonTemporal = this.dialogRef.componentInstance.data;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async aprobar() {
    const jsonEnviar = {
      noCuenta: this.jsonTemporal.noCuenta,
      accion: 1,
      usuario: localStorage.getItem('usuario'),
    };
    console.log('aprobar---', jsonEnviar);
    const sendData$ = this.servicio.saveAccionSolicitud(jsonEnviar);
    await firstValueFrom(sendData$)
      .then(async res => {
        await this.notificaciones.notificacionGenerica(res.message, 'success');
        this.clearFormulario();
        location.reload();
      })
      .catch(async err => {
        console.log(err);
        await this.notificaciones.errorControlado(err);
        location.reload();
      });
  }

  async rechazar() {
    const jsonEnviar = {
      noCuenta: this.jsonTemporal.noCuenta,
      accion: 2,
      usuario: localStorage.getItem('usuario'),
    };
    console.log('rechazar---', jsonEnviar);
    const sendData$ = this.servicio.saveAccionSolicitud(jsonEnviar);
    await firstValueFrom(sendData$)
      .then(async res => {
        await this.notificaciones.notificacionGenerica(res.message, 'success');
        this.clearFormulario();
        location.reload();

      })
      .catch(async err => {
        console.log(err);
        await this.notificaciones.errorControlado(err);
        location.reload();

      });
  }

  clearFormulario() {
    this.router.navigate(['/revision']);
  }

}
