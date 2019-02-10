import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginModel } from '../login-model';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Avatar } from '../Avatar';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  loginModel = new LoginModel('');
  isUserLoggedIn: boolean;
  showHead = true;
  isAdmin: boolean;

  constructor(config: NgbDropdownConfig, private auth: AuthService, private data: DataService, private router: Router) { 
    config.autoClose = false;
    config.placement = 'bottom-right';
  }

  ngOnInit() {
     this.data.loggedin.subscribe(x => {
       this.isUserLoggedIn = x;
     });
     this.data.isAdmin.subscribe(x => {
       this.isAdmin = x;
     });
  }
  onSubmit(f: NgForm) {
    if (f.valid) {
      this.loginModel = f.value as LoginModel;
      this.auth.login(f.value as LoginModel);
      // tslint:disable-next-line:no-unused-expression
      () => {
        this.data.setLoggedIn();
        this.data.newFunc();
      };
  }
}

  onLogout() {
    this.data.setLoggedIn();
    this.auth.isAdmin = false;
    this.router.navigate(['/dashboard']);
    localStorage.removeItem('token');
  }
}
