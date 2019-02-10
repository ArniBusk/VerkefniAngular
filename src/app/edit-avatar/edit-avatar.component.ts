import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Avatar } from '../Avatar';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-avatar',
  templateUrl: './edit-avatar.component.html',
  styleUrls: ['./edit-avatar.component.css']
})
export class EditAvatarComponent implements OnInit {
  avatarList: Avatar[];
  selectedAvatar: Avatar;
  tempAvatar: Avatar;

  @Output('displayedAvatar') displayedAvatar = new EventEmitter<Avatar>();
  eventSubject: Subject<void> = new Subject<void>();

  constructor(private data: DataService) { }


  ngOnInit() {
    this.data.getAvatars().subscribe(x => {
      this.avatarList = x;
    });
  }

  selectAvatar(a: Avatar) {
    this.tempAvatar = a;
    this.selectedAvatar = new Avatar(
      this.tempAvatar.Name,
      this.tempAvatar.Effect,
      this.tempAvatar.Hp,
      this.tempAvatar.Lore,
      this.tempAvatar.Phrase,
      this.tempAvatar.Cost);
    this.selectedAvatar.Id = a.Id;
    this.data.displayedAvatar = a;
    this.displayedAvatar.emit(a);
    this.data.effectCheck();
    this.eventSubject.next();
  }

  onSubmit() {
    this.data.putAvatar(this.selectedAvatar.Id, this.selectedAvatar).subscribe();
  }
}
