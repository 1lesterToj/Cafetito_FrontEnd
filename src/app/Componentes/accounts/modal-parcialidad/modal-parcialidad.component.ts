import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
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

  viewSpinner: boolean = true;
  viewTable: boolean = false;
  tableCols: string[] = ['contador', 'licenciaT', 'placaT', 'pesoP'];//variables tabla operador
  hText: string[] = ['ID.', 'Licencia transportista', 'Placa transporte', 'Peso Parcialidad'];//encabezado tabla operador
  tableData: {}[] = [{}];

  constructor(
    private servicio: GeneralServiceService,
    private notificaciones: GenericNotification,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalParcialidadComponent>,
  ) { }

  ngOnInit(): void {
    console.log("DATOS DEL COMPONENTE ANTERIOR: ", this.dialogRef.componentInstance.data)
    this.jsonTemporal = this.dialogRef.componentInstance.data;
    this.getParcialidadesTable();
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

    const sendData$ = this.servicio.saveParcialidad(jsonEnviar);
    await firstValueFrom(sendData$)
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

  async getParcialidadesTable() {
    let objetoTemp = {
      noCuenta: this.jsonTemporal.numeroCuenta
    };
    const getData$ = this.servicio.getParcialidades(objetoTemp);
    await firstValueFrom(getData$)
      .then(res => {
        let parcialidadLista: any = [];
        res.data.forEach(async (element: any) => {
          await parcialidadLista.push({
            contador: element.idParcialidad,
            licenciaT: element.licenciaTransportista,
            placaT: element.noPlacaTransporte,
            pesoP: element.pesoParcialidadKg
          })
          this.tableData = parcialidadLista;
        });
        console.log(this.tableData)
        this.viewTable = true;
        this.viewSpinner = false;
      })
      .catch(err => {
        this.viewSpinner = false;

      });
  }

}

