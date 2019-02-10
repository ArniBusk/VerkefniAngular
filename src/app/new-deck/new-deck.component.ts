import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Card } from '../Card';
import { DataService } from '../data.service';

@Component({
  selector: 'app-new-deck',
  templateUrl: './new-deck.component.html',
  styleUrls: ['./new-deck.component.css']
})
export class NewDeckComponent implements OnInit {
  activeCards: Card[];
  cardList: Card[];
  deckFull = false;
  newDeck: Card[];
  selectedCard: Card;
  tempDeckName: string = '';
  deckbool = false;
  ind: number;
  decklist: string[];
  constructor(private data: DataService) { }
  @Output() showNewDeckComp = new EventEmitter<boolean>();

  ngOnInit() {
    this.data.getActiveCards().subscribe(x => {
      console.log(x);
      this.activeCards = x;
    });
    this.data.getUserDeck().subscribe(x => {
      this.decklist = x;
    })
  }
  makeNewDeck() {
    if(this.deckNameCheck()) {
       this.deckbool = true;
       this.newDeck = new Array<Card>();
      this.cardList = new Array<Card>();
      this.activeCards.forEach(x => {
      this.cardList.push(x);
    });
    } else {
      console.log(`Already Have a deck named ${this.tempDeckName}`);
      
    }
   
  }

  addCardToDeck(a: Card) {
    if (this.checkDeckSize(this.newDeck)) {
      this.newDeck.push(this.selectedCard);
      this.cardList.splice(this.cardList.indexOf(a), 1);
    } 
    if(!this.checkDeckSize(this.newDeck)) {
      this.deckFull = true;
    }
    console.log(this.deckFull);
    console.log(this.newDeck.length);
  }

  checkDeckSize(a: Card[]): boolean {
    if (a.length >= 30) {
      return false;
    } else {
      return true;
    }
  }

  selectCard(a: Card) {
    this.selectedCard = a;
    this.addCardToDeck(a);
  }

  saveDeck() {
   this.data.postNewDeck(this.tempDeckName, this.newDeck).subscribe(
      () => {
        this.reset();
      });
    
  }
  reset() {
    this.tempDeckName = '';
    this.cardList = new Array<Card>();
    this.activeCards.forEach(x => {
    this.cardList.push(x);
    })
    this.showNewDeckComp.emit(false);
  }

  deckNameCheck(): boolean {
    let tempBool = true;
    this.decklist.forEach(x => {
      console.log(x);
      console.log(this.tempDeckName);
      if (x.toLowerCase === this.tempDeckName.toLowerCase){
        console.log('this works');
        tempBool = false;
      }
      
    });
   return tempBool;
    
  }
}

