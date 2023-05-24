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
  dataChofer: any = [];
  dataCamion: any = [];
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

    const res =  this.servicio.getData<any>(this.servicio.URL_CUENTA3, `obtenerTransportistasActivos`, null).toPromise()
    .then(res => {
      console.log('TRANSPORTISTAS ACTIVOS ------ >>', res)
      let cuentasLista: any = [];
      res.data.forEach(async (element: any) => {

        await cuentasLista.push({
          licenciaTransportista: element.licenciaTransportista,
          nombre: element.nombreTransportista + ' ' +element.apellidoTransportista

        })
        console.log("forEach--- ", cuentasLista);
        this.dataChofer = cuentasLista;
      });
    })

    const res2 =  this.servicio.getData<any>(this.servicio.ULR_TRANSPORTE, `obtenerTrasportesActivos`, null).toPromise()
    .then(res2 => {
      console.log('TRANSPORTE ACTIVOS ------ >>', res2)
      let cuentasLista: any = [];
      res2.data.forEach(async (element: any) => {

        await cuentasLista.push({
          noPlaca: element.noPlaca,
          placa: element.noPlaca

        })
        console.log("forEach--- ", cuentasLista);
        this.dataCamion = cuentasLista;
        console.log(" after forEach--- ", this.dataCamion);
      });
    })
  }


  closeDialog() {
    this.dialogRef.close();
  }

  async saveParcialidad() {
    this.viewTable = false;
    let jsonLicencia = {
      licenciaTransportista: this.licenciaTransportista,
      placaTransporte: this.placaTransporte
    };
    console.log("json licencia", jsonLicencia);
    const validacionLicencia$ = this.servicio.getValidacionLicencia(jsonLicencia);
    await firstValueFrom(validacionLicencia$)
      .then(async res => {
        const jsonEnviar = {
          noCuenta: this.jsonTemporal.numeroCuenta,
          nitProductor: this.jsonTemporal.nitProductor,
          licenciaTransportista: this.licenciaTransportista,
          placaTransporte: this.placaTransporte,
          pesoParcialidad: this.pesoParcialidad,
          usuarioOpera: localStorage.getItem('usuario'),
        };
        console.log('el Json ---------- ',jsonEnviar)
        const sendData$ = this.servicio.saveParcialidad(jsonEnviar);
        await firstValueFrom(sendData$)
          .then(async res => {
            await this.notificaciones.notificacionGenerica('PARCIALIDAD CREADA EXITOSAMENTE', 'success');
            this.clearFormulario();
            setTimeout(async () => {
              await this.getParcialidadesTable();
              this.viewTable = true;
            }, 1000);


          })
          .catch(async err => {
            await this.notificaciones.errorControlado(err);
          });
      })
      .catch(async err => {
        //await this.errorControlado(err);
        await this.notificaciones.errorControlado(err);
      })
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
        res.data.forEach(async (element: any, index: any) => {
          await parcialidadLista.push({
            contador: index + +1,
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

