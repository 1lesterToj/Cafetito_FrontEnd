import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

declare var $: any;

@Injectable({
    providedIn: 'root'
})

export class GenericNotification {

    constructor() { }

    public async notificacionGenerica(texto: string, icon: any) {
        await Swal.fire({
            title: 'AVISO',
            text: texto,
            icon: icon,
            confirmButtonText: 'Aceptar',
            backdrop: true,
            allowOutsideClick: false
        })
    }

    public async notificacionSuccess(){
        await Swal.fire({
            title: 'Bienvenido',
            icon: 'success',
            confirmButtonColor: '#a18262',
            confirmButtonText: 'Aceptar'
          });
    }
}