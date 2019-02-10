import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { Avatar } from '../Avatar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  avatarlist: Avatar[];
  selectedAvatar: Avatar;

  @Output('displayedAvatar') displayedAvatar = new EventEmitter<Avatar>();
  eventSubject: Subject<void> = new Subject<void>()

  constructor(private data: DataService) {}

  ngOnInit() {
    this.getAvatars();
  }

  getAvatars() {
    this.data.getAvatars().subscribe(x => {
      this.avatarlist = x;
    });
  }


  onSelect(a: Avatar) {
    this.selectedAvatar = a;
    this.displayedAvatar.emit(this.selectedAvatar);
    this.eventSubject.next();
    this.data.displayedAvatar = a;
    this.data.ownCheck(this.selectedAvatar);
    this.data.effectCheck();
    this.data.getReview(a.Id).subscribe(x => {
      this.data.reviewsonavatar.next(x);
    });
  }
}
