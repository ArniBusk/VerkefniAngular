import { Component, OnInit, Input } from '@angular/core';
import { Avatar } from '../Avatar';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-avatar',
  templateUrl: './add-avatar.component.html',
  styleUrls: ['./add-avatar.component.css']
})
export class AddAvatarComponent implements OnInit {
  newAvatar: Avatar;
  submitted = false;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.newAvatar = new Avatar();
  }

  onSubmit() {
     this.submitted = true;
     console.log(this.newAvatar);
      this.data.postAvatar(this.newAvatar).subscribe();
   }
  resetAvatar() {
    this.newAvatar = new Avatar();
    this.submitted = false;
  }

}
