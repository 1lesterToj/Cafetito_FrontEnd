import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalParcialidadComponent } from 'src/app/Componentes/accounts/modal-parcialidad/modal-parcialidad.component';
import { ModalAccionComponent } from 'src/app/Componentes/Cafetito/modal-accion/modal-accion.component';

import { ModalPesoComponent } from 'src/app/Componentes/Peso-Cabal/modal-peso/modal-peso.component';
import { GeneralServiceService } from 'src/app/Core/services/general-service.service';
import { firstValueFrom } from 'rxjs';
import { GenericNotification } from '../notificaciones';
import Swal from 'sweetalert2';
import { ModalToleranciaComponent } from 'src/app/Componentes/Cafetito/modal-tolerancia/modal-tolerancia.component';

import { ModalQrComponent } from 'src/app/Componentes/accounts/transportistas/modal-qr/modal-qr.component';


@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent implements OnInit {

  tableDataSrc!: any;
  selection = new SelectionModel(true, []);
  listaSeleccion: any[] = [];
  filterData!: Event;


  @Input('tableColumns') tableCols!: string[];
  @Input() headerText !: string[];
  @Input() tableData: {}[] = [];
  @Input() inputFilter !: any;
  @Input() limpiarSeleccion: any;
  @Input() parentComp!: string;

  @Output() usuariosSeleccionado = new EventEmitter<any>();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private service: GeneralServiceService,
    private notification: GenericNotification) { }

  ngOnInit(): void {
    this.tableDataSrc = new MatTableDataSource(this.tableData);
    this.tableDataSrc.sort = this.sort;
    this.tableDataSrc.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    /****** Agrega los establecimientos activos a la tabla ******/
    if (changes['tableData'] && changes['tableData'].currentValue) {
      this.tableDataSrc = new MatTableDataSource(changes['tableData'].currentValue);
      this.tableDataSrc.sort = this.sort;
      this.tableDataSrc.paginator = this.paginator;
    }

    /****** Aplica el filtro de busqueda ******/
    if (changes['inputFilter'] !== undefined && changes['inputFilter'].currentValue !== undefined) {
      this.applyFilter(this.inputFilter);
    }

    /****** Limipia el establecimiento seleccionado ******/
    if (changes['limpiarSeleccion'] !== undefined && changes['limpiarSeleccion'].currentValue === true) {
      this.selection.clear();
      this.listaSeleccion = [];
    }

    // console.log(changes);
  }
  /****** Metodo para el filtro de busqueda ******/
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSrc.filter = filterValue.trim().toLowerCase();
  }
  /****** Metodos para seleccion de un item de la fila ******/
  async seleccionar(row: any) {
    console.log(row);
    /*await this.service.getGestionesByNumero(row.noGestion).toPromise().then(
      res => {
        this.globales.gestion = res;
        this.router.navigate(["/bandeja-revisor"]);
      }
    ).catch(
      error => {
        console.log("Error en gestion " + error );
      }
    )*/
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableDataSrc.data.length;
    return numSelected === numRows;
  }

  /****** Método que quita las selecciones de las filas de la tabla ******/
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.tableDataSrc.data.forEach((row: never) => this.selection.select(row));
  }

  saveParcialidad(numeroCuenta: string, nitProductor: string) {
    console.log("Data>>>>>", numeroCuenta, nitProductor);
    const abrirDialogo = this.dialog.open(ModalParcialidadComponent, {
      height: '720px',
      width: '550px',
      data: {
        numeroCuenta: numeroCuenta,
        nitProductor: nitProductor
      },
      disableClose: true
    })

    abrirDialogo.afterClosed().subscribe(result => {

    });
  };

  accionParcialidad(noCuenta: string, nitProductor: string, pesajeTotalKg: number, tipoCafe: string) {
    console.log("Data--------->", noCuenta, nitProductor, pesajeTotalKg, tipoCafe);
    const abrirDialogo = this.dialog.open(ModalAccionComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        noCuenta: noCuenta,
        nitProductor: nitProductor,
        pesajeTotalKg: pesajeTotalKg,
        tipoCafe: tipoCafe
      },
      disableClose: true
    })

    abrirDialogo.afterClosed().subscribe(result => {

    });
  };


  accionPeso(contador: number, noCuenta: string, nitProductor: string) {
    console.log("DATA ====> ", contador, noCuenta);
    const abrirDialogo = this.dialog.open(ModalPesoComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        contador: contador,
        noCuenta: noCuenta,
        nitProductor: nitProductor
      },
      disableClose: true
    })
    abrirDialogo.afterClosed().subscribe(result => {

    });
  }

  async validarTolerancia(noCuenta: string) {
    console.log("DATA ====> ", noCuenta);
    const user = localStorage.getItem('usuario');
    let jsontemp = {
      noCuenta: noCuenta,
      usuario: user,
      accion: 0
    };
    const postService$ = this.service.postValidarTolerancia(jsontemp);
    await firstValueFrom(postService$)
      .then(async resultado => {
        console.log(resultado.message);
        if (resultado.data != null) {
          const abrirDialogo = this.dialog.open(ModalToleranciaComponent, {
            height: 'auto',
            width: 'auto',
            data: resultado,
            disableClose: true
          })
          abrirDialogo.afterClosed().subscribe(result => {

          });
        } else {
          await this.notification.notificacionGenerica(resultado.message, "success");
          location.reload();
        }


      })
      .catch(error => {

      })
  }

  accionQr(licenciaTransportista: number, nombreTransportista: string) {
    console.log("Data--------->", licenciaTransportista, nombreTransportista);
    const abrirDialogo = this.dialog.open(ModalQrComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        nombreTransportista: nombreTransportista,
        licenciaTransportista: licenciaTransportista
      },
      disableClose: true
    })

    abrirDialogo.afterClosed().subscribe(result => {

    });
  };


}
