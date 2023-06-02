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
  botonAutorizar: boolean = false;
  constructor(private _route: ActivatedRoute,
    private service: GeneralServiceService,
    private notificaciones: GenericNotification) { }


  async ngOnInit(): Promise<void> {
    this._route.params.subscribe(async (params: Params) => {
      const desencriptar$ = this.service.getDencriptar(params['licencia']);
      await firstValueFrom(desencriptar$)
        .then(async res => {
          this.parametro = res;
          console.log("PARAMETRO ****", this.parametro);

          const roles = localStorage.getItem('roles');
          if (roles == 'ROLE_GARITA') {
            await this.getDataTransportista(this.parametro);
          } else {
            await this.notificaciones.notificacionGenerica('NO CUENTA CON PERMISOS PARA ESTA SOLICITUD', 'warning');
            this.service.logout();
          }
        })
        .catch(err => {
          this.notificaciones.errorControlado(err);
        })

    })


  }

  async getDataTransportista(data: any) {
    let jsonTemp = {
      licenciaTransportista: data
    }

    const getTransportistaQR$ = this.service.getTransportistaQR(jsonTemp);
    await firstValueFrom(getTransportistaQR$)
      .then(res => {
        this.dataUser = res.data[0];


        if (this.dataUser.id_parcialidad == null) {
          this.botonAutorizar = true;

        }
        this.viewHtml = true;
      })
      .catch(async err => {
        await this.notificaciones.errorControlado(err);
        this.service.logout();
      })
  }

  async autorizarLicencia() {
    /**
     * METODO PARA AUTORIZAR
     */
    // this.dataUser
    let usuarioLog = localStorage.getItem('usuario');
    const postAutorizaciones$ = this.service.postAutorizaciones(this.dataUser.id_parcialidad, usuarioLog);
    await firstValueFrom(postAutorizaciones$)
      .then(async res => {
        await this.notificaciones.notificacionGenerica(res.message, 'success');
        location.reload();
      })
      .then(err => {
        this.notificaciones.errorControlado(err);
      })


  }

}
