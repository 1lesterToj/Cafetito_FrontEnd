import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import * as images64 from '../../shared/base64images';


(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class PdfToleranciaService {

  constructor() { }
  public async createPDF(data: any) {
    console.log("dataaaaaa>>>>", data)
    /*     const blob = await this.imgBlob();
        const img64 = await this.convertFileBase64(blob); */
    const docDefinition: any = {
      content: [

        /**
         * INICIO DE ENCABEZADO
         * logo, titulo, codigo qr
         */
        {
          columns: [

            {
              text: 'Anexo de Cuenta\n¡Gracias por utilizar los servicios de Cafetito S.A !\n¡Procesando el café de Guatemala!\n\n',
              alignment: 'center',
              fontSize: 14,
            },
          ],
        },

        /**
          * Subtitulos pdf 
          */
        {

          columns: [

          ]
        },
        {
          style: 'section',
          table: {
            widths: ['0%', '100%', '0%'],
            body: [
              [
                {}, {
                  text: 'Información de la cuenta\n',
                  color: 'white',
                  alignment: 'center',
                  fillColor: '#5b3a29'
                }, {}
              ]
            ]
          },
          layout: 'noBorders'
        },

        /**
         * INICIO TABLA INFORMACION PESAJE
         */
        {
          layout: 'noBorders',
          margin: [0, 10, 0, 0],
          table: {
            headerRows: 0,
            widths: ['*', '50%', '50%'],
            heights: [22, 22, 22, 22, 22, 22],

            body: this.bodyAv(data),
          }
        },
        {
          style: 'section',
          table: {
            widths: ['0%', '100%', '0%'],
            body: [
              [
                {}, {
                  text: 'Reporte Peso Cabal\n',
                  color: 'white',
                  alignment: 'center',
                  fillColor: '#5b3a29'
                }, {}
              ]
            ]
          },
          layout: 'noBorders'
        },
        /**
                 * INICIO TABLA INFORMACION DE QUIEN REALIZARÁ EL PEAJA
                 */
        {
          layout: 'noBorders',
          margin: [0, 10, 0, 0],
          table: {
            headerRows: 0,
            widths: ['*', '50%', '50%'],
            heights: [22, 22, 22, 22, 22, 22],

            body: this.bodyAv2(data),
          }
        },
        {
          style: 'section',
          table: {
            widths: ['0%', '100%', '0%'],
            body: [
              [
                {}, {
                  text: '\n',
                  color: '#17527f',
                  alignment: 'center',
                  fillColor: '#5b3a29'
                }, {}
              ]
            ]
          },
          layout: 'noBorders'
        },

      ],
    };

    pdfMake.createPdf(docDefinition).open();
  }

  /* private assentImg() {
    return this.http.get(img, { responseType: 'blob' });
  }

  private async imgBlob() {
    const consumoImg$ = this.assentImg();
    await firstValueFrom(consumoImg$)
      .then((res) => { return res })
  }

  private convertFileBase64(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!blob) resolve(''); const reader = new FileReader(); reader.readAsDataURL(blob); reader.onload = () => {
        const base64 = reader.result!.toString(); resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  } */
  bodyAv(data: any) {
    return [
      ['', { text: 'Número de Cuenta: ', bold: true, }, data.noCuenta],
      ['', { text: 'NIT productor: ', bold: true }, data.nitProductor],
      ['', { text: 'Liencia Transportista: ', bold: true }, data.licenciaTransportista],
      ['', { text: 'Placa Transporte: ', bold: true }, data.placaTransporte],
      ['', { text: 'Estado Parcialidad: ', bold: true }, 'CUENTA CONFIRMADA']
    ]
  }

  bodyAv2(data: any) {
    return [
      ['', { text: 'Tolerancia:: ', bold: true, }, data.tolerancia],
      ['', { text: 'Peso total cuenta:', bold: true, }, data.pesoTotalCuenta],
      ['', { text: 'Peso total Bascula: ', bold: true }, data.pesoTotalBascula],
      ['', { text: 'Comentario: ', bold: true }, data.message]

    ]
  }
}