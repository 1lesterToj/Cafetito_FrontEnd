import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GeneralServiceService } from 'src/app/Core/services/general-service.service';
import { GenericNotification } from 'src/app/shared/notificaciones';

@Component({
  selector: 'app-revision-solicitud',
  templateUrl: './revision-solicitud.component.html',
  styleUrls: ['./revision-solicitud.component.css']
})
export class RevisionSolicitudComponent implements OnInit {
  tableData: {}[] = [{}];
  viewTable: boolean = false;
  tableCols: string[] = ['contador', 'noCuenta', 'nitProductor', 'cantidadParcialidades', 'pesajeTotalKg', 'tipoCafe', 'accionAgregar'];//variables tabla operador
  hText: string[] = ['ID.', 'Número de cuenta', 'NIT de productor', 'Cantidad de parcialidades', 'Pesaje total', 'Tipo de café', 'Accion'];//encabezado tabla operador

  constructor(
    private servicio: GeneralServiceService,private notificacion: GenericNotification
  ) { }

  async ngOnInit(): Promise<void> {
    const res$ = this.servicio.getData<any>(this.servicio.URL_CUENTA2, `obtenerCuentasCreadas`, null)
    await firstValueFrom(res$)
      .then(res => {
        console.log('CUENTAS DEL USUARIO LOGUEADO>>', res)
        let cuentasLista: any = [];
        res.data.forEach(async (element: any, index: any) => {

          await cuentasLista.push({
            contador: index + +1,
            cantidadParcialidades: element.cantidadParcialidades,
            estado: element.estado,
            fechaAdicion: element.fechaAdicion,
            fechaModifico: element.fechaModifico,
            idCuenta: element.idCuenta,
            nitProductor: element.nitProductor,
            noCuenta: element.noCuenta,
            pesajeTotalKg: element.pesajeTotalKg,
            tipoCafe: element.tipoCafe,

            usuarioAdiciono: element.usuarioAdiciono,
            usuarioModifico: element.usuarioModifico,
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

  actualizarPagina(){
    location.reload();
  }

}
