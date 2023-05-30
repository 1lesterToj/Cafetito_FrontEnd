import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from 'src/app/Core/services/general-service.service';

@Component({
  selector: 'app-garita',
  templateUrl: './garita.component.html',
  styleUrls: ['./garita.component.css']
})
export class GaritaComponent implements OnInit {
  tableData: {}[] = [{}];
  viewTable: boolean = false;
  tableCols: string[] = ['contador', 'licenciaTransportista', 'nombreTransportista','correoElectronico', 'estado','accionQr'];//variables tabla operador
  hText: string[] = ['ID.', ' Licencia Transportista', ' Nombre Transportista',' Correo Electronico', 'Estado',' Accion'];//encabezado tabla operador

  constructor(
    private servicio: GeneralServiceService,
  ) {

   }

  async ngOnInit(): Promise<void> {
    const res =  this.servicio.getData<any>(this.servicio.URL_CUENTA3, `obtenerTransportistasActivos`, null).toPromise()
    .then(res => {

        console.log('CUENTAS PARA PESO CABAL ------ ', res)
        let cuentasLista: any = [];
        res.data.forEach(async (element: any, index: any) => {

          await cuentasLista.push({
            contador: index + +1,
            licenciaTransportista: element.licenciaTransportista,

            nombreTransportista: element.nombreTransportista +' '+element.apellidoTransportista,

            correoElectronico: element.correoElectronico,

            estado: element.estado == 10 ? 'ACTIVO' : 'INACTIVO',
          })
          this.tableData = cuentasLista;
          console.log('table data ---- ', this.tableData);
        });
        this.viewTable = true;
       // this.viewSpinner = false;

      })
      .catch(async err => {
        //await this.notificaciones.errorControlado(err);
       // this.viewSpinner = false;
      });
  }

}
