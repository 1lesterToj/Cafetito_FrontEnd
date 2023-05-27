import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { GeneralServiceService } from 'src/app/Core/services/general-service.service';
import { GenericNotification } from 'src/app/shared/notificaciones';

@Component({
  selector: 'app-consulta-qr-transportista',
  templateUrl: './consulta-qr-transportista.component.html',
  styleUrls: ['./consulta-qr-transportista.component.css']
})
export class ConsultaQrTransportistaComponent implements OnInit {
  parametro !: string | number;
  dataUser!: any;
  viewHtml: boolean = false;
  constructor(private _route: ActivatedRoute,
    private service: GeneralServiceService,
    private notificaciones: GenericNotification) { }


  async ngOnInit(): Promise<void> {
    this._route.params.subscribe(async (params: Params) => {
      this.parametro = params['licencia'];
      console.log("PARAMETRO ****", this.parametro);

    })

    await this.getDataTransportista(this.parametro);
  }

  async getDataTransportista(data: any) {
    let jsonTemp = {
      licenciaTransportista: data
    }

    const getTransportistaQR$ = this.service.getTransportistaQR(jsonTemp);
    await firstValueFrom(getTransportistaQR$)
      .then(res => {
        this.dataUser = res.data[0];
        console.log("DATAAA>>", this.dataUser)
        this.viewHtml = true;
      })
      .catch(async err => {
        await this.notificaciones.errorControlado(err);
        this.service.logout();
      })
  }

}
