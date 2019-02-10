import { Component, OnInit } from '@angular/core';
import { Card } from '../Card';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit {
  cardsList: Card[];
  selectedCard: Card;
  submitted = false;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getAllCards().subscribe(x => {
      this.cardsList = x;
      console.log(x);
    })
  }

  onSelect(c:Card) {
    this.selectedCard = c;
    this.submitted = false;
  }
  onSubmit() {
    this.data.putCard(this.selectedCard, this.selectedCard.Id).subscribe();
    this.submitted = true;
  }
}
