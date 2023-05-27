import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-consulta-qr-transportista',
  templateUrl: './consulta-qr-transportista.component.html',
  styleUrls: ['./consulta-qr-transportista.component.css']
})
export class ConsultaQrTransportistaComponent implements OnInit {
  parametro !: string | number;
  constructor(private _route: ActivatedRoute,) { }
  

  ngOnInit(): void {
    this._route.params.subscribe(async (params: Params) => {
      console.log(params['origen']);
      this.parametro = params['origen'];

    })
  }

}
