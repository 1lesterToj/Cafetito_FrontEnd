import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from 'src/app/Core/services/general-service.service';
import { GenericNotification } from 'src/app/shared/notificaciones';

@Component({
  selector: 'app-validar-tolerancia',
  templateUrl: './validar-tolerancia.component.html',
  styleUrls: ['./validar-tolerancia.component.css']
})
export class ValidarToleranciaComponent implements OnInit {
  tableData: {}[] = [{}];
  viewTable: boolean = false;
  tableCols: string[] = ['contador', 'noCuenta', 'nitProductor', 'cantidadParcialidades', 'pesajeTotalKg','tipoCafe', 'accionTolerancia'];//variables tabla operador
  hText: string[] = ['ID.',' Numero de Cuenta', ' NIT Productor', ' Cantidad Parcialidades', ' Pesaje Total KG',' Tipo Café', ' Accion'];//encabezado tabla operador


  constructor(
    private servicio: GeneralServiceService,
    private notificacion: GenericNotification
  ) { }

  async ngOnInit(): Promise<void> {
    const res =  this.servicio.getData<any>(this.servicio.URL_CUENTA2, `obtenerCuentasCerradas`, null).toPromise()
    .then(res => {

        console.log('CUENTAS PARA PESO CABAL ------ ', res)
        let cuentasLista: any = [];
        res.data.forEach(async (element: any, index: any) => {

          await cuentasLista.push({
            contador: index + +1,
            noCuenta: element.noCuenta,
            nitProductor: element.nitProductor,
            cantidadParcialidades: element.cantidadParcialidades,
            pesajeTotalKg: element.pesajeTotalKg,
            tipoCafe: element.tipoCafe,
          })
          this.tableData = cuentasLista;
          console.log('table data ---- ', this.tableData);
        });
        this.viewTable = true;
       // this.viewSpinner = false;

      })
      .catch(async err => {
        await this.notificacion.errorControlado(err);
       console.log('error: ' + err);
      });
  }

  
  actualizarPagina(){
    location.reload();
  }

}
