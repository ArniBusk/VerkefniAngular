import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RegisterModel } from '../register-model';
import { DataService } from '../data.service';
import { LoginModel } from '../login-model';
import { Avatar } from '../Avatar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registered = false;
  registerModel = new RegisterModel('');
  avatarList: Avatar[];
  defaultAvatars: Avatar[];
  constructor(
    private authService: AuthService,
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.getAvatars().subscribe(x => {
      this.avatarList = x;
    });
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      this.authService.register(f.value as RegisterModel);
      const user = f.value as RegisterModel;
      this.registered = true;
      // this.data.giveAvatars(user.Email);
    }
  }

}
