import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalAccionComponent } from '../modal-accion/modal-accion.component';
import { GenericNotification } from 'src/app/shared/notificaciones';
import { GeneralServiceService } from 'src/app/Core/services/general-service.service';
import { Router } from '@angular/router';
import { PdfToleranciaService } from 'src/app/Core/services/pdf-tolerancia.service';

@Component({
  selector: 'app-modal-tolerancia',
  templateUrl: './modal-tolerancia.component.html',
  styleUrls: ['./modal-tolerancia.component.css']
})
export class ModalToleranciaComponent implements OnInit {

  jsonTemporal: any;
  menssage!: string;

  constructor(
    private servicio: GeneralServiceService,
    private notificaciones: GenericNotification,
    private router: Router,
    private pdf : PdfToleranciaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalToleranciaComponent>,
  ) { }
  async ngOnInit(): Promise<void> {
    console.log("DATOS DEL COMPONENTE ANTERIOR: ", this.dialogRef.componentInstance.data)
    this.jsonTemporal = this.dialogRef.componentInstance.data;
    this.menssage = this.jsonTemporal.message;
    console.log(this.menssage);
  }

  async descargarPdf(){
    let jsonTemp = JSON.parse(this.jsonTemporal.data);
    await this.pdf.createPDF(jsonTemp);
    location.reload();
  }
}
