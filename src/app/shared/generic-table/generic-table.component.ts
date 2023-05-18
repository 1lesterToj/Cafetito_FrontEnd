import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalParcialidadComponent } from 'src/app/Componentes/accounts/modal-parcialidad/modal-parcialidad.component';

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

  constructor(private dialog: MatDialog) { }

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

}
