import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginModel} from './login-model';
import {RegisterModel} from './register-model';
import {TokenModel} from './token-model';
import {DataService} from './data.service';
import {Router} from '@angular/router';



@Injectable()
export class AuthService {
  public isAdmin = false;
  constructor(
    @Inject('ApiRoot') private apiRoot,
    private http: HttpClient,
    private data: DataService,
    private router: Router
  ) {}

  public get TokenResponse(): TokenModel {
    const tokenjson = JSON.parse(localStorage.getItem("token")) as TokenModel;
    return tokenjson;
  }

  login(model: LoginModel) {
    let body = `grant_type=password&username=${model.Email}&password=${model.Password}`;
    let header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    console.log(`${this.apiRoot}/Token`, body, {
      headers: header
    });
    this.http.post < TokenModel > (`${this.apiRoot}/Token`, body, {
      headers: header
    }).subscribe(x => {
        let token = JSON.stringify(x);
        localStorage.setItem('token', token);
        console.log('token set');
      },
      err => {
        console.log(err)
      },
      () => {
        this.data.setLoggedIn();
        console.log(this.data.loggedin.value);
        this.checkAdmin();
      }
    );
  }

  checkAdmin() {
    let header = new HttpHeaders().set('Authorization', `Bearer ${this.TokenResponse.access_token}`);
    this.http.get < boolean > (`${this.apiRoot}/api/Account/admin`, {
      headers: header
    }).subscribe(x => {
      this.isAdmin = x;
      this.data.isAdmin.next(x);
    })
  }
  register(model: RegisterModel) {
    let body = `Email=${model.Email}&password=${model.Password}&confirmpassword=${model.ConfirmPassword}`;
    let header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    console.log(`Email=${model.Email}&password=${model.Password}&confirmpassword=${model.ConfirmPassword}`);
    this.http.post(`${this.apiRoot}/api/Account/Register`, body, {
      headers: header
    }).subscribe(x => {
        console.log(x);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('er að gera þetta');

        var log: LoginModel = new LoginModel();
        log.Email = model.Email;
        log.Password = model.Password;
        this.login(log);
        this.router.navigate(['/dashboard']);
      })
  }
}
