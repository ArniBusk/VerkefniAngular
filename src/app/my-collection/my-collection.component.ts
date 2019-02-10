import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Avatar } from '../Avatar';
import { DataService } from '../data.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Card } from '../Card';
import { Review } from '../Review';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.css']
})
export class MyCollectionComponent implements OnInit {
  index: number;
  selectedAvatar: Avatar;
  avatarList: Avatar[];
  showNew: boolean;
  showNewtemp = new BehaviorSubject<boolean>(false);
  decklist: string[];
  selectedDeckCards: Card[];
  reviewList: Review[];
  selectedReview: Review;
  reviewAvatar: Avatar;
  editReviewBool = false;
  newReview: string = '';

  @Output('displayedAvatar') displayedAvatar = new EventEmitter<Avatar>();
  eventSubject: Subject<void> = new Subject<void>()

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.avatarlisttemp.subscribe(x => {
      this.avatarList = x;
    });
    this.showNewtemp.subscribe(x => {
      this.showNew = x;
    });
    this.data.getUserDeck().subscribe(x => {
      this.decklist = x;
    });
    this.data.getReviewByPlayer().subscribe(x => {
      this.reviewList = x;
    })
  }
  editDisplay(i: number) {
    this.index = i;
  }
  onSelect(a: Avatar) {
    this.selectedAvatar = a;
    this.displayedAvatar.emit(this.selectedAvatar);
    this.eventSubject.next();
    this.data.displayedAvatar = a;
    this.data.ownCheck(this.selectedAvatar);
    this.data.effectCheck();
    
  }
  newDeck() {
    this.showNewtemp.next(true);
  }
  onEdit(a: boolean) {
    this.showNewtemp.next(a);
    console.log(this.showNewtemp);
  }

  getDecks() {
    this.data.getUserDeck().subscribe(x => {
      this.decklist = x;
    });
  }

  selectDeck(s: string) {
    this.data.getDeckCards(s).subscribe(x => {
      this.selectedDeckCards = x;
    })
  }
  selectReview(i:Review) {
    this.selectedReview = i;
    this.data.getAvatarById(i.AvatarId).subscribe(x => {
      this.reviewAvatar = x;
    });
  }

  deleteReview() {
    this.data.deleteReview(this.selectedReview.Id).subscribe();
    this.reviewList.splice(this.reviewList.indexOf(this.selectedReview), 1);
    this.selectedReview = null;
    this.reviewAvatar = null;
    
  }
  editReview() {
    this.editReviewBool = true;
  }
  saveReview() {
    let indexofselectedreview = this.reviewList.indexOf(this.selectedReview);
    this.reviewList[indexofselectedreview].Asessment = this.newReview;
    this.data.editReview(this.newReview, this.selectedReview.Id).subscribe(x => {},
       err => console.log(err),
        () => {
            this.editReviewBool = false;
            this.selectedReview = null;
            }
    );
  }
}
