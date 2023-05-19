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
  tableCols: string[] = ['idCuenta', 'noCuenta', 'nitProductor', 'cantidadParcialidades', 'pesajeTotalKg', 'tipoCafe', 'accionAgregar'];//variables tabla operador
  hText: string[] = ['ID.', 'Número de cuenta', 'NIT de productor', 'Cantidad de parcialidades', 'Pesaje total', 'Tipo de café', 'Accion'];//encabezado tabla operador

  constructor(
    private servicio: GeneralServiceService,
  ) { }

  ngOnInit(): void {
  }

}
