import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Avatar } from '../Avatar';
import { DataService } from '../data.service';
import { Subscription, Observable } from 'rxjs';
import { componentRefresh } from '@angular/core/src/render3/instructions';
import { AvatarOwn } from '../avatar-own';
import { Review } from '../Review';


@Component({
  selector: 'app-store-avatar-stats',
  templateUrl: './store-avatar-stats.component.html',
  styleUrls: ['./store-avatar-stats.component.css']
})
export class StoreAvatarStatsComponent implements OnInit {
  effect: string;
  owned: boolean;
  avatarlist: Avatar[];
  tempAvatar: Avatar;
  tempavatarlist: Avatar[];
  reviews: Review[];
  showReviews = false;
  addReview = false;
  newReview: Review = new Review();
  date: any;
  selectedReview: Review;
  eventsubscription: any;

  // tslint:disable-next-line:no-input-rename
  @Input('displayedAvatar') displayedAvatar: Avatar;
  @Input() event: Observable<void>;
  

  constructor(private data: DataService) {
    this.tempavatarlist = this.data.tempownedAvatars;
    
   }

  ngOnInit() {
    this.data.avatarlisttemp.subscribe(x => {
      this.tempavatarlist = x;
    })
    this.data.getOwnedAvatars().subscribe(x => {
      this.avatarlist = x;
    });
    
    this.data.avatarEffect.subscribe(x => {
     
      this.effect = x;
    });
    this.tempAvatar = this.displayedAvatar;

    this.data.isUserAvatarOwned.subscribe(x => {
      this.owned = x;
    });

    this.data.reviewsonavatar.subscribe(x => {
      this.reviews = x;
    });

    this.eventsubscription = this.event.subscribe(() => this.selectedReview = null);
    }
   
  buyAvatar() {
    this.data.postNewAvatarToOwned(this.displayedAvatar.Id).subscribe();
    this.data.avatarlisttemp.value.push(this.displayedAvatar);
    this.data.ownCheck(this.displayedAvatar);
  }
  sellAvatar() {
    this.data.deleteAvatarFromOwned(this.displayedAvatar.Id).subscribe();
    console.log(this.data.avatarlisttemp.value.indexOf(this.displayedAvatar));
    
    this.data.avatarlisttemp.value.splice(this.data.avatarlisttemp.value.indexOf(this.displayedAvatar), 1);
    this.data.ownCheck(this.displayedAvatar);
  }
  reviewToggle() {
    var temp = !this.showReviews;
    this.showReviews = temp;
    this.selectedReview = null;
  }

  addReviewToggle() {
   var temp = !this.addReview
    this.addReview = temp;
  }

  submitReview() {
    var tempreview: Review = {Asessment: this.newReview.Asessment, AvatarId: this.data.displayedAvatar.Id, Id: null, Time: null, UserId: null};
    this.data.postReview(this.displayedAvatar.Id, tempreview).subscribe();
    this.addReviewToggle();
    this.data.getReview(this.displayedAvatar.Id).subscribe(x => {
      this.data.reviewsonavatar.next(x);
      console.log(this.data.reviewsonavatar.value);
      
    });
      
   
  }
  selectReview(r: Review) {
    this.selectedReview = r;
  }


}
