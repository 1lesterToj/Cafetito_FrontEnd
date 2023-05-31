import { Injectable } from '@angular/core';
import { estados } from './estados.interface';

@Injectable()

export class VariableGlobal {

    navarPerm!: boolean;

    estados: estados[] = [
        { id: 1, valor: 'SOLICITUD DE CUENTA' },
        { id: 2, valor: 'CUENTA CREADA' },
        { id: 3, valor: 'CUENTA ABIERTA' },
        { id: 4, valor: 'PESAJE INICIADO' },
        { id: 5, valor: 'PESAJE FINALIZADO' },
        { id: 6, valor: 'CUENTA CERRADA' },
        { id: 7, valor: 'CUENTA CONFIRMADA' },
        { id: 8, valor: 'CUENTA RECHAZADA' },
        { id: 9, valor: 'CUENTA APROBADA' },
    ];
}
