import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-account',
  templateUrl: './parent-account.component.html',
  styleUrls: ['./parent-account.component.css']
})
export class ParentAccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  actualizarPagina(){
    location.reload();
  }
}
