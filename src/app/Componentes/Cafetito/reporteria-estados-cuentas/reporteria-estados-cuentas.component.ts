import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GeneralServiceService } from 'src/app/Core/services/general-service.service';
import { GenericNotification } from 'src/app/shared/notificaciones';
import { VariableGlobal } from 'src/app/shared/variable-global';

@Component({
  selector: 'app-reporteria-estados-cuentas',
  templateUrl: './reporteria-estados-cuentas.component.html',
  styleUrls: ['./reporteria-estados-cuentas.component.css']
})
export class ReporteriaEstadosCuentasComponent implements OnInit {
  fechaDesde: any;
  fechaHasta: any;
  estado: any;
  viewTable: boolean = false;
  viewSpinner: boolean = true;
  tableCols: string[] = ['contador', 'noCuenta', 'nitProductor', 'cantidadParcialidades', 'pesajeTotalKg', 'tipoCafe', 'estado', 'jsonAnexo'];//variables tabla operador
  hText: string[] = ['ID.', 'Número de cuenta', 'NIT de productor', 'Cantidad de parcialidades', 'Pesaje total', 'Tipo de café', 'Estado', 'PDF'];//encabezado tabla operador
  tableData: {}[] = [{}];
  estados = this.variableGlobal.estados;
  constructor(
    private notificaciones: GenericNotification, private service: GeneralServiceService, private variableGlobal: VariableGlobal
  ) { }
  async ngOnInit(): Promise<void> {
    const roles = localStorage.getItem('roles');
    if (roles == 'ROLE_BENEFICIO') {
      this.viewSpinner = false;
    } else {
      await this.notificaciones.notificacionGenerica('NO CUENTA CON PERMISOS PARA ESTA SOLICITUD', 'warning');
      this.service.logout();
    }
  }

  async consultarCuentas() {
    const getConsultar$ = this.service.getCuentas(this.fechaDesde, this.fechaHasta, this.estado);
    await firstValueFrom(getConsultar$)
      .then(res => {
        console.log("DATAREPORTE>>", res)
        let cuentasLista: any = [];
        let estadoTemp: boolean = false;
        let datos: any;
        let valorEstadoTemp: string;
        let jsonTemp: any = null;
        res.forEach(async (element: any, index: any) => {
          datos = element;
          this.variableGlobal.estados.forEach(async (element: any) => {
            if (datos.estado == element.id) {
              valorEstadoTemp = element.valor;
            }
          })

          if (datos.jsonAnexo != null) {
            jsonTemp = JSON.parse(datos.jsonAnexo);
          }

          await cuentasLista.push({
            contador: index + +1,
            noCuenta: datos.noCuenta,
            nitProductor: datos.nitProductor,
            cantidadParcialidades: datos.cantidadParcialidades,
            pesajeTotalKg: datos.pesajeTotalKg,
            tipoCafe: datos.tipoCafe,
            estado: valorEstadoTemp,
            jsonAnexo: null,
            jsonPdf: jsonTemp
          })
          this.tableData = cuentasLista;
        });

        this.viewTable = true;

      })
      .catch(async err => {
        await this.notificaciones.errorControlado(err);
        this.limpiar();
      })
  }

  async limpiar() {
    this.fechaDesde = '',
      this.fechaHasta = '',
      this.estado = 0
    this.viewTable = false;
  }

  getMaxDate(): string {
    const today = new Date();
    const utcOffset = -6;
    const utcDate = new Date(today.getTime() + utcOffset * 60 * 60 * 1000);

    const year = utcDate.getFullYear();
    const month = utcDate.getMonth() + 1;
    const day = utcDate.getDate();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    return formattedDate;
  }

}
