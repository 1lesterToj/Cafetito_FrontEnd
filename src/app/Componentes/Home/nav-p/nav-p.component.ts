import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GeneralServiceService } from 'src/app/Core/services/general-service.service';
import { VariableGlobal } from 'src/app/shared/variable-global';

@Component({
  selector: 'app-nav-p',
  templateUrl: './nav-p.component.html',
  styleUrls: ['./nav-p.component.css']
})
export class NavPComponent implements OnInit {
  navarPerm: boolean = true;
  usuarioLog: any;

  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private variableGlobal: VariableGlobal,
    private service: GeneralServiceService) { }

  ngOnInit() {
    this.usuarioLog = localStorage.getItem('usuario');

  }

  logout() {
    this.service.logout();
  }


}
