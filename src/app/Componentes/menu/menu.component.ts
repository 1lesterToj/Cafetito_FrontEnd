import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  roles: any;
  beneficio: boolean = false;
  agricultor: boolean = false;
  pesoCabal: boolean = false;
  garita: boolean = false;
  constructor() { }

  ngOnInit(): void {

    this.roles = localStorage.getItem('roles');
    if(this.roles == 'ROLE_AGRICULTOR'){
   console.log("vamos a ver si entra")
   this.agricultor = true;

    } else if (this.roles == 'ROLE_BENEFICIO'){
      this.beneficio = true;
      console.log("vamos a ver por que No")

    } else if (this.roles == 'ROLE_PESO_CABAL'){
      this.pesoCabal = true;

    }else if (this.roles == 'ROLE_GARITA'){
      this.garita = true;
    }
  }

}
