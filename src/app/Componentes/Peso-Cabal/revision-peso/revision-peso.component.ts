import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from 'src/app/Core/services/general-service.service';

@Component({
  selector: 'app-revision-peso',
  templateUrl: './revision-peso.component.html',
  styleUrls: ['./revision-peso.component.css']
})
export class RevisionPesoComponent implements OnInit {
  tableData: {}[] = [{}];
  viewTable: boolean = false;
  tableCols: string[] = ['contador', 'noCuenta', 'nitProductor', 'licenciaTransportista', 'noPlacaTransporte','pesoParcialidadKg', 'accionPesar'];//variables tabla operador
  hText: string[] = ['ID.',' Numero de Cuenta', ' NIT Productor', ' Licencia Transportista', ' No. Placa',' Pero Parcialidad KG', ' Accion'];//encabezado tabla operador

  constructor(
    private servicio: GeneralServiceService,
  ) { }

 async ngOnInit(): Promise<void> {
     //SE OBTIENE CUENTAS CREADAS AL NIT DEL USUARIO LOGUEADO
     const jsonTemp: any = {
      param: 11
    }

    await this.servicio.getParcialidadesByEstado(jsonTemp).toPromise().then(res => {

        console.log('CUENTAS PARA PESO CABAL ------ ', res)
        let cuentasLista: any = [];
        res.data.forEach(async (element: any, index: any) => {

          await cuentasLista.push({
            contador: index + +1,
            idParcialidad: element.idParcialidad,
            noCuenta: element.noCuenta,
            nitProductor: element.nitProductor,
            licenciaTransportista: element.licenciaTransportista,
            noPlacaTransporte: element.noPlacaTransporte,
            pesoParcialidadKg: element.pesoParcialidadKg
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
