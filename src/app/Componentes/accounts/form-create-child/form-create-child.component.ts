import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from 'src/app/Core/services/general-service.service';
import { GenericNotification } from 'src/app/shared/notificaciones';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-create-child',
  templateUrl: './form-create-child.component.html',
  styleUrls: ['./form-create-child.component.css']
})
export class FormCreateChildComponent implements OnInit {
  nitProductor!: string;
  usuarioOpera!: string
  pesajeTotalKg!: any;
  usuarioLog: any = '';
  tipoCafe!: any;
  disabled: boolean = true;
  cantidadParcialidades!: any;
  viewTable: boolean = false;
  tableCols: string[] = ['contador', 'numerocuenta', 'nit_productor', 'cantidadP', 'pesajeT', 'tipoC', 'accionParcialidad'];//variables tabla operador
  hText: string[] = ['ID.', 'Número de cuenta', 'NIT de productor', 'Cantidad de parcialidades', 'Pesaje total', 'Tipo de café', 'Parcialidad'];//encabezado tabla operador
  tableData: {}[] = [{}];

  constructor(private servicio: GeneralServiceService,
    private notificaciones: GenericNotification,) { }

  async ngOnInit(): Promise<void> {
    await this.getDataClient();
  }

  async saveAccount() {
    const saveData = {
      nitProductor: this.nitProductor,
      usuarioOpera: this.usuarioLog,
      pesajeTotalKg: this.pesajeTotalKg,
      tipoCafe: this.tipoCafe,
      cantidadParcialidades: this.cantidadParcialidades,
    }

    const saveDataAccount$ = this.servicio.saveData(saveData);
    await firstValueFrom(saveDataAccount$)
      .then(async (res: any) => {
        await this.notificaciones.notificacionGenerica('Cuenta Creada', 'success');
        this.cleanInput();
      })
      .catch(err => {
        this.notificaciones.notificacionGenerica('Error', 'info');

      })
  }

  async getDataClient() {
    this.usuarioLog = localStorage.getItem('usuario');
    const objetoTemp: any = {
      username: this.usuarioLog
    }

    const getData$ = this.servicio.getNitUser(objetoTemp);
    await firstValueFrom(getData$)
      .then(async (res: any) => {
        this.nitProductor = res.data.nit;
        console.log("SE OBTIENE DATOS DE USUARIO LOGUEADO:>>", res)

        //SE OBTIENE CUENTAS CREADAS AL NIT DEL USUARIO LOGUEADO
        const jsonTemp: any = {
          nitProductor: res.data.nit
        }

        await this.servicio.dataAccount(jsonTemp).toPromise()
          .then(res => {
            console.log('CUENTAS DEL USUARIO LOGUEADO>>', res)
            let cuentasLista: any = [];
            res.data.forEach(async (element: any) => {

              await cuentasLista.push({
                contador: element.idCuenta,
                numerocuenta: element.noCuenta,
                nit_productor: element.nitProductor,
                cantidadP: element.cantidadParcialidades,
                pesajeT: element.pesajeTotalKg,
                tipoC: element.tipoCafe,
              })
              this.tableData = cuentasLista;
            });
            this.viewTable = true;

          })
          .catch(error => {
            console.log(error)
          });

      })
      .catch(err => {
        this.notificaciones.notificacionGenerica('Error', 'info');
      })
  }


  cleanInput() {
    this.usuarioOpera = "";
    this.pesajeTotalKg = "";
    this.tipoCafe = "";
    this.cantidadParcialidades = "";
  }


}
