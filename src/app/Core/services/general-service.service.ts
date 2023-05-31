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
const URL_ENCRIPTAR = environment.BASE_API + '/utils';
const ULR_REPORTERIA = environment.BASE_API + '/reporteria';





@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {
  URL_CUENTA2 = environment.BASE_API + '/cuenta';
  URL_CUENTA3 = environment.BASE_API + '/transportista';
  ULR_TRANSPORTE = environment.BASE_API + '/transporte';
  ULR_PARCIALIDADS = environment.BASE_API + '/parcialidades';
  URL_PESOCABAL = environment.BASE_API + '/pesoCabal'
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

  postValidarTolerancia(data: any) {
    return this.http.post<any>(`${URL_CUENTA}/validarToleranciaCuenta`, data,
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

  putData(pUrl: string, pParam: any, pBody: any) {
    let body = null;
    if (pBody) {
      body = pBody;
    }
    if (pParam === null) {
      return this.http.put(`${pUrl}`, body, this.generateHeaders(true));
    } else {
      return this.http.put(`${pUrl}/${pParam}`, body, this.generateHeaders(true));
    }
  }

  getTransportistaQR(data: any) {
    return this.http.post<any>(ULR_TRANSPORTISTA + '/getTransportistaQR', data)
  };

  getEncriptar(data: string) {
    return this.http.get<any>(`${URL_ENCRIPTAR}/EncriptarTexto/${data}`,
      this.generateHeaders(true));
  };

  getDencriptar(data: any) {
    return this.http.get<any>(`${URL_ENCRIPTAR}/desEncriptarTexto/${data}`,
      this.generateHeaders(true));
  };

  getCuentas(fechaDesde: any, fechaHasta: any, estado: any) {
    return this.http.get<any>(`${ULR_REPORTERIA}/cuentasByFecha/${fechaDesde}/${fechaHasta}/${estado}`,
      this.generateHeaders(true));
  };

}
