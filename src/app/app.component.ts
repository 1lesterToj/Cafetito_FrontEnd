import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from './Core/services/general-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cafecito';

  constructor() {

  }
  ngOnInit(): void {

  }



}
