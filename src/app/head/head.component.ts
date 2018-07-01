import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  username: string;
  constructor(public data: DataService) { }

  ngOnInit() {
    this.username = this.data.getSession('username');
  }

  logout() {
    this.data.ErrorMsg('注销成功');
    this.data.removeSession('token');
    this.data.goto('/');
  }

}
