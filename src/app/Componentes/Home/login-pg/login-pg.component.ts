import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { GeneralServiceService } from 'src/app/Core/services/general-service.service';
import { GenericNotification } from 'src/app/shared/notificaciones';
import { VariableGlobal } from 'src/app/shared/variable-global';

@Component({
  selector: 'app-login-pg',
  templateUrl: './login-pg.component.html',
  styleUrls: ['./login-pg.component.css']
})
export class LoginPGComponent implements OnInit {
  username!: string;
  password!: string;
  constructor(
    private servicios: GeneralServiceService,
    private notificaciones: GenericNotification,
    private router: Router,
    private _route: ActivatedRoute,
    private variableGlobal: VariableGlobal
  ) { }

  async ngOnInit(): Promise<void> {

  }


  async login() {
    console.log("usuario: ", this.username);
    console.log("password: ", this.password);
    const login = {
      username: this.username,
      password: this.password
    };

    const loginService$ = this.servicios.login(login);
    await firstValueFrom(loginService$)
      .then(async (res: any) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('guard', 'Authorization');
        localStorage.setItem('usuario', res.username);
        await this.notificaciones.notificacionSuccess();
        if (login) {
          this.router.navigate(['/homePage/true']);
          this.variableGlobal.navarPerm = true;
        }
      })
      .catch(err => {

      })
  }

}
