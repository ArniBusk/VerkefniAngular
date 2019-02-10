import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Avatar } from '../Avatar';
import { Card } from '../Card';
import { Review } from '../Review';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  newAvatar: Avatar = new Avatar();
  displayIndex: number;
  selectedAvatar: Avatar;
  effect: string;
  avatarList: Avatar[];
  cardList: Card[];
  selectedCard: Card;
  reviewList: Review[];
  selectedReview: Review;
  reviewAvatar: Avatar;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getAvatars().subscribe(x => {
      this.avatarList = x;
    });
    
    this.data.getAllCards().subscribe( x => {
      this.cardList = x;
    });

    this.data.getAllReviews().subscribe(x => {
      this.reviewList = x;
    })
  }

  displaySelect(i: number) {
    this.displayIndex = i;
    console.log(this.displayIndex);
  }

  onAvatarSelect(a: Avatar) {
    this.selectedAvatar = a;
  }

  deleteAvatar() {
    this.data.deleteAvatar(this.selectedAvatar.Id).subscribe();
    this.avatarList.splice(this.avatarList.indexOf(this.selectedAvatar), 1);
    this.selectedAvatar = null;
  }
  onCardSelect(c: Card) {
    this.selectedCard = c;
  }
  
  deleteCard() {
    this.data.deleteCard(this.selectedCard.Id).subscribe();
    this.cardList.splice(this.cardList.indexOf(this.selectedCard), 1);
    this.selectedCard = null;
  }
  selectReview(i: Review) {
    this.selectedReview = i;
    this.data.getAvatarById(this.selectedReview.AvatarId).subscribe(x => {
      this.reviewAvatar = x;
    });
  }
  deleteReview() {
    this.data.deleteReview(this.selectedReview.Id).subscribe();
    this.reviewList.splice(this.reviewList.indexOf(this.selectedReview), 1);
    this.selectedReview = null;
    this.reviewAvatar = null;
  }
}
