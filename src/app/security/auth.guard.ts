import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router) {
  }

  canActivate(): Observable<boolean> {
    console.log(localStorage.getItem)
    if (localStorage.getItem('accessToken') == null || localStorage.getItem('guard') !== 'Authorization') {
      this.route.navigate(['/loginpg/true']);
      console.log("NO TIENE PERMISOS PARA NAVEGARA")
      return of(false);
    } else {
      return of(true)
    }
  }

}
