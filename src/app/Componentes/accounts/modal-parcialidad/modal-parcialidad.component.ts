import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GeneralServiceService } from 'src/app/Core/services/general-service.service';
import { GenericNotification } from 'src/app/shared/notificaciones';


@Component({
  selector: 'app-modal-parcialidad',
  templateUrl: './modal-parcialidad.component.html',
  styleUrls: ['./modal-parcialidad.component.css']
})
export class ModalParcialidadComponent implements OnInit {

  licenciaTransportista!: string;
  placaTransporte!: string;
  pesoParcialidad!: number;
  jsonTemporal!: any;

  constructor(
    private servicio: GeneralServiceService,
    private notificaciones: GenericNotification,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalParcialidadComponent>,
  ) { }

  ngOnInit(): void {
    console.log("DATOS DEL COMPONENTE ANTERIOR: ", this.dialogRef.componentInstance.data)
    this.jsonTemporal = this.dialogRef.componentInstance.data;
  }


  closeDialog() {
    this.dialogRef.close();
  }

  async saveParcialidad() {
    const jsonEnviar = {
      noCuenta: this.jsonTemporal.numeroCuenta,
      nitProductor: this.jsonTemporal.nitProductor,
      licenciaTransportista: this.licenciaTransportista,
      placaTransporte: this.placaTransporte,
      pesoParcialidad: this.pesoParcialidad,
      usuarioOpera: localStorage.getItem('usuario'),
    };
    await this.servicio.saveParcialidad(jsonEnviar).toPromise()
      .then(async res => {
        await this.notificaciones.notificacionGenerica('PARCIALIDAD CREADA EXITOSAMENTE', 'success');
        this.clearFormulario();
      })
      .catch(err => {

      });
  }

  clearFormulario() {
    this.licenciaTransportista = '';
    this.placaTransporte = '';
    this.pesoParcialidad = 0;
  }

}

