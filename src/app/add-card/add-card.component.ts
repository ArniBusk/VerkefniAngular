import { Component, OnInit } from '@angular/core';
import { Card } from '../Card';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
  newCard: Card;
  submitted = false;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.newCard = new Card();
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.newCard);
    this.data.postCard(this.newCard).subscribe();
  }
 resetCard() {
   this.newCard = new Card();
   this.submitted = false;
 }


}
