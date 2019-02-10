import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { BehaviorSubject } from 'rxjs';
import { Avatar } from '../Avatar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedin: boolean;
  constructor( private data: DataService) { }

  ngOnInit() {
    this.data.loggedin.subscribe(x => {
      this.loggedin = x;
    });
    }
  }


