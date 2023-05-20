import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const ULR_AUTH = environment.BASE_API + '/auth';
const URL_CUENTA = environment.BASE_API + '/cuenta';
const URL_USUARIOS = environment.BASE_API + '/usuarios';
const ULR_PARCIALIDADES = environment.BASE_API + '/parcialidades';
const URL_TRANSPORTISTAS = environment.BASE_API + '/transportista/transporte';
const ULR_TRANSPORTISTA = environment.BASE_API + '/transportista';


@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {
  URL_CUENTA2 = environment.BASE_API + '/cuenta';

  constructor(
    private http: HttpClient
  ) { }

  /**functions here */
  login(login: any): Observable<boolean> {
    return this.http.post<any>(ULR_AUTH + '/authenticate', login)
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('guard');
    localStorage.removeItem('usuario');
    location.reload();
  }

  /**
   * Funcion para almacenar datos en tabla cuenta
   * @param data 
   */

  saveData(data: any) {
    return this.http.post<any>(`${URL_CUENTA}/creacionCuenta`, data,
      this.generateHeaders(true));
  };

  dataAccount(data: any) {
    return this.http.post<any>(URL_CUENTA + '/obtenerCuentasByNit', data);
  };

  getNitUser(data: any) {
    return this.http.post<any>(URL_USUARIOS + '/obtenerUsuarioByUsername', data)
  };

  saveParcialidad(data: any) {
    return this.http.post<any>(ULR_PARCIALIDADES + '/EnvioParcialidad', data)
  };

  getParcialidades(data: any) {
    return this.http.post<any>(`${ULR_PARCIALIDADES}/consultaParcialidad`, data,
      this.generateHeaders(true));
  };

  getValidacionLicencia(data: any) {
    return this.http.post<any>(`${URL_TRANSPORTISTAS}/getValidacionTransportistaTransporte`, data,
      this.generateHeaders(true));
  };


  public generateHeaders(json: boolean = false): object {
    let headers: HttpHeaders;
    if (json) {
      headers = new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json'
      });
    } else {
      headers = new HttpHeaders({
        'Accept': '*/*'
      });
    }
    // console.log('header a enviar:', JSON.stringify(headers));
    let httpOptions: object = { "headers": headers };
    return httpOptions;
  }


  public getData<T>(pUrl: string, pNombreServicio: string | null, pParametro: string | null = null, pJSON: boolean = false): Observable<T> {
    if (pNombreServicio == null) {
        if (pParametro === null) {
            return this.http.get<T>(`${pUrl}`, this.generateHeaders(pJSON));
        } else {
            return this.http.get<T>(`${pUrl}/${pParametro}`, this.generateHeaders(pJSON));
        }
    } else {
        if (pParametro === null) {
            return this.http.get<T>(`${pUrl}/${pNombreServicio}`, this.generateHeaders(pJSON));
        } else {
            return this.http.get<T>(`${pUrl}/${pNombreServicio}/${pParametro}`, this.generateHeaders(pJSON));
        }
    }
}

saveAccionSolicitud(data: any) {
  return this.http.post<any>(URL_CUENTA + '/autorizarCuenta', data)
};

getParcialidadesByEstado(data: any) {
  return this.http.post<any>(ULR_PARCIALIDADES + '/consultaParcialidadesByEstado', data);
};

}
