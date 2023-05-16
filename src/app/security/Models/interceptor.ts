import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { error } from 'console';
import { GenericNotification } from 'src/app/shared/notificaciones';

@Injectable()
export class YourInterceptor implements HttpInterceptor {
    constructor(private notificaciones: GenericNotification) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("*****INTERCEPTOR********", req);
        //const authToken: string = window.localStorage.getItem("accessToken");
        const token = localStorage.getItem('accessToken')!;
        const requestClone = req.clone(
            {
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            }
        );
        return next.handle(requestClone).pipe(catchError((error) => this.herrorHandler(error)));
    }

    herrorHandler(error: HttpErrorResponse): Observable<never> {
        if (error instanceof HttpErrorResponse) {
            if (error.error instanceof ErrorEvent) {
                console.log('ERROR DE CLIENTE');
                this.notificaciones.notificacionGenerica("ERROR DE CLIENTE", "info");
            } else {
                if (error.status === 401) {
                    this.notificaciones.notificacionGenerica("NO CUENTA CON ACCESOS", "info");

                } else if (error.status === 403) {
                    this.notificaciones.notificacionGenerica("EL USUARIO NO POSEE PERMISOS NECESARIOS", "warning");

                } else if (error.status === 404) {
                    this.notificaciones.notificacionGenerica(error.error, "warning");
                } else {
                    this.notificaciones.notificacionGenerica("ERROR DE SERVIDOR", "error");
                }
            }
        } else {
            console.log("OTRO TIPO DE ERROR");
            this.notificaciones.notificacionGenerica("ERROR DESCONOCIDO", "error");

        }
        return throwError(error);
    }

}