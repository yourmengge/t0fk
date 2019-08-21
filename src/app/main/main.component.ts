import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:import-spacing
// import *  as SockJS from 'sockjs-client';
// tslint:disable-next-line:import-spacing
// import *  as Stomp from '@stomp/stompjs';

import { DataService, CodeType } from '../data.service';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public data: DataService, public http: HttpService) {

  }

  ngOnInit() {
  }
}
