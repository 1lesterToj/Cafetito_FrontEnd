import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { GeneralServiceService } from 'src/app/Core/services/general-service.service';
import { PdfPesoCabalService } from 'src/app/Core/services/pdf-peso-cabal.service';
import { GenericNotification } from 'src/app/shared/notificaciones';

@Component({
  selector: 'app-modal-peso',
  templateUrl: './modal-peso.component.html',
  styleUrls: ['./modal-peso.component.css']
})
export class ModalPesoComponent implements OnInit {
  jsonTemporal!: any;
  viewSpinner: boolean = true;
  usuarioLogeado!: any;
  pesoBascula!: string;
  dataResTemp!: any;
  viewPDF: boolean = false;
  constructor(
    private servicio: GeneralServiceService,
    private notificaciones: GenericNotification,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalPesoComponent>,
    public pdfService: PdfPesoCabalService
  ) { }

  ngOnInit(): void {
    console.log("DATOS DEL COMPONENTE ANTERIOR: ", this.dialogRef.componentInstance.data)
    this.jsonTemporal = this.dialogRef.componentInstance.data;
    this.usuarioLogeado = localStorage.getItem('usuario')
    this.viewSpinner = false;
  }

  async enviarPeso() {
    this.viewSpinner = true;

    const json = {
      idpesaje: this.jsonTemporal.contador,
      noCuenta: this.jsonTemporal.noCuenta,
      pesoBascula: this.pesoBascula,
      usuarioOpera: this.usuarioLogeado,
    }

    console.log("JSON A ENVIAR >>>", json)
    const putPeso$ = this.servicio.putData(this.servicio.URL_PESOCABAL + '/cargaPesajeParcialidad', null, json);
    await firstValueFrom(putPeso$)
      .then(async res => {
        this.dataResTemp = res;
        console.log("DATA PESOCABAL>>>", res)
        await this.notificaciones.notificacionGenerica('REGISTRO EXISTOSO', 'success');
        this.viewSpinner = false;
        this.viewPDF = true;
      })
      .catch(async err => {
        this.viewSpinner = false;
        await this.notificaciones.errorControlado(err);
      })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async downloadPDF() {
    this.viewSpinner = true;
    let jsonTemporal = JSON.parse(this.dataResTemp.data)
    console.log(jsonTemporal)

    /*   let jsonTemporal = {
        idParcialidad: 3,
        noCuenta: "20230524NCCTR2",
        nitProductor: "105557749",
        licenciaTransportista: "2780578960109",
        placaTransporte: "C-029JNQ",
        estado: "PARCIALIDAD PESADA",
        pesoBascula: 5500.0,
        sobrante: 500.0,
        faltante: 0.0,
        message: "LA PARCIALIDAD NUMERO 3 CUENTA CON UN SOBRANTE DE 500.0,COMUNICARSE CON EL BENEFICIO"
      } */
    await this.pdfService.createPDF(jsonTemporal);
    this.viewSpinner = false;
    location.reload();
  }
}
