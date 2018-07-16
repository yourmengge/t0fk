import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  @Input() text;
  @Output() active = new EventEmitter<boolean>();
  message: any;
  constructor(public data: DataService) { }

  ngOnInit() {
    this.message = this.text;
  }

  submit(type: boolean) {
    if (type) {
      this.active.emit(true);
    } else {
      this.active.emit(false);
    }
  }

}
