import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GeneralServiceService } from 'src/app/Core/services/general-service.service';
import { GenericNotification } from 'src/app/shared/notificaciones';
import { VariableGlobal } from 'src/app/shared/variable-global';

@Component({
  selector: 'app-revision-solicitud',
  templateUrl: './revision-solicitud.component.html',
  styleUrls: ['./revision-solicitud.component.css']
})
export class RevisionSolicitudComponent implements OnInit {
  tableData: {}[] = [{}];
  viewTable: boolean = false;
  tableCols: string[] = ['contador', 'noCuenta', 'nitProductor', 'cantidadParcialidades', 'pesajeTotalKg', 'tipoCafe', 'estadoCuenta', 'accionAgregar'];//variables tabla operador
  hText: string[] = ['ID.', 'Número de cuenta', 'NIT de productor', 'Cantidad de parcialidades', 'Pesaje total', 'Tipo de café', 'Estado', 'Accion'];//encabezado tabla operador

  constructor(
    private servicio: GeneralServiceService, private notificacion: GenericNotification, private variableGlobal: VariableGlobal
  ) { }

  async ngOnInit(): Promise<void> {
    const res$ = this.servicio.getData<any>(this.servicio.URL_CUENTA2, `obtenerCuentasCreadas`, null)
    await firstValueFrom(res$)
      .then(res => {
        console.log('CUENTAS DEL USUARIO LOGUEADO>>', res)
        let cuentasLista: any = [];
        let datos: any;
        let valorEstadoTemp: string;
        res.data.forEach(async (element: any, index: any) => {
          datos = element;

          this.variableGlobal.estados.forEach(async (element: any) => {
            if (datos.estado == element.id) {
              valorEstadoTemp = element.valor;
            }
          })

          await cuentasLista.push({
            contador: index + +1,
            cantidadParcialidades: datos.cantidadParcialidades,
            estado: datos.estado,
            fechaAdicion: datos.fechaAdicion,
            fechaModifico: datos.fechaModifico,
            idCuenta: datos.idCuenta,
            nitProductor: datos.nitProductor,
            noCuenta: datos.noCuenta,
            pesajeTotalKg: datos.pesajeTotalKg,
            tipoCafe: datos.tipoCafe,
            estadoCuenta: valorEstadoTemp,

            usuarioAdiciono: datos.usuarioAdiciono,
            usuarioModifico: datos.usuarioModifico,
          })
          console.log("forEach--- ", cuentasLista);
          this.tableData = cuentasLista;
        });
        this.viewTable = true;

      })
      .catch(async error => {
        await this.notificacion.errorControlado(error);
      });
  }

  actualizarPagina() {
    location.reload();
  }

}
