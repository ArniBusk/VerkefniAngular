import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Avatar } from './Avatar';
import { Card } from './Card';
import { Review } from './Review';
import { TokenModel } from './token-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  avatarUrl = 'http://localhost:57097/api/avatar';
  reviewUrl = 'http://localhost:57097/api/review';
  cardsUrl = 'http://localhost:57097/api/cards';
  decksUrl = 'http://localhost:57097/api/cards/deck';

  loggedin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  //#region Data Display Variables
  ownedAvatars: Avatar[];
  displayedAvatar: Avatar;
  isUserAvatarOwned: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  avatarEffect: BehaviorSubject<string> = new BehaviorSubject<string>('');
  tempownedAvatars: Avatar[];
  avatarlisttemp: BehaviorSubject<Avatar[]> = new BehaviorSubject<Avatar[]>(this.tempownedAvatars);
  reviewsonavatar: BehaviorSubject<Review[]> = new BehaviorSubject<Review[]>([]);
  reviewsbyplayer: BehaviorSubject<Review[]> = new BehaviorSubject<Review[]>([]);
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  
  //#endregion

  constructor(private http: HttpClient, private router: Router) {
    /*this.getOwnedAvatars().subscribe(x => {
      this.tempownedAvatars = x;
      console.log(x);
      this.avatarlisttemp = new BehaviorSubject<Avatar[]>(this.tempownedAvatars);
    })*/
   }

  //#region Avatars API requests
    // get All
      getAvatars(): Observable<Avatar[]> {
        return this.http.get<Avatar[]>(this.avatarUrl, {headers: this.getLoginHeader()});
      }

    // get By Id
    getAvatarById(id: number): Observable<Avatar> {
      return this.http.get<Avatar>(this.avatarUrl + '/' + id, {headers: this.getLoginHeader()});
    }

    // Edit Avatar
    putAvatar(id: number, a: Avatar): Observable<Avatar> {
      return this.http.put<Avatar>(this.avatarUrl + '/' + id, a, {headers: this.getLoginHeader()});
    }
    // Delete Avatar
    deleteAvatar(id: number): Observable<any> {
      return this.http.delete(this.avatarUrl + '/' + id, {headers: this.getLoginHeader()});
    }

    // Add New Avatar
    postAvatar(av: Avatar): Observable<Avatar> {
      return this.http.post<Avatar>(this.avatarUrl, av, {headers: this.getLoginHeader()});
    }

    // GetOwnedAvatars
    getOwnedAvatars(): Observable<Avatar[]> {
      return this.http.get<Avatar[]>(`${this.avatarUrl}/owned`, {headers: this.getLoginHeader()});
    }
    // Buy Avatar
    postNewAvatarToOwned(id: number): Observable<Avatar> {
      return this.http.post<Avatar>(`${this.avatarUrl}/buy/${id}`, null, {headers: this.getLoginHeader()});
    }
    // Sell Avatar
    deleteAvatarFromOwned(id: number): Observable<any> {
      return this.http.delete(`${this.avatarUrl}/owned/${id}`, {headers: this.getLoginHeader()});
    }

    // gives player 3 avatars on register
    postAvatarlist(idlist: number[], user: string): Observable<any> {
      return this.http.post(`${this.avatarUrl}/give?${user}`, idlist, {headers: this.getLoginHeader()});
    }
  //#endregion
  //#region Cards API requests
    // Get Active cards
    getActiveCards(): Observable<Card[]> {
      return this.http.get<Card[]>(this.cardsUrl, {headers: this.getLoginHeader()});
    }

    // Get All Cards active and inactive
    getAllCards(): Observable<Card[]> {
      return this.http.get<Card[]>(this.cardsUrl + '/' + 'all', {headers: this.getLoginHeader()});
    }

    // Get Card By Id
    getCardById(id: number): Observable<Card> {
      return this.http.get<Card>(this.cardsUrl + '/' + id, {headers: this.getLoginHeader()});
    }

    // Add New Card
    postCard(c: Card): Observable<Card> {
      return this.http.post<Card>(this.cardsUrl, c, {headers: this.getLoginHeader()});
    }

    // Edit Card
    putCard(c: Card, id: number): Observable<Card> {
      return this.http.put<Card>(this.cardsUrl + '/' + id, c, {headers: this.getLoginHeader()});
    }

    // Delete Card
    deleteCard(id: number): Observable<any> {
      return this.http.delete(this.cardsUrl + '/' + id, {headers: this.getLoginHeader()});
    }

  //#endregion
  //#region Reviews API requests

    // Get Reviews on card
    getReview(id: number): Observable<Review[]> {
      return this.http.get<Review[]>(this.reviewUrl + '/' + id, {headers: this.getLoginHeader()});
    }

    // Add New Review on card where id = cardId
    postReview(id: number, rev: Review): Observable<Review> {
      return this.http.post<Review>(`${this.reviewUrl}/${id}/add`, rev ,{headers: this.getLoginHeader()});
    }

    // Delete review (crush the revoloution) where id = ReviewId
    deleteReview(id: number): Observable<any> {
      return this.http.delete(this.reviewUrl + '/' + id + '/delete' ,{headers: this.getLoginHeader()});
    }

    getReviewByPlayer(): Observable<Review[]> {
      return this.http.get<Review[]>(`${this.reviewUrl}/user`, {headers: this.getLoginHeader()});
    }

    getAllReviews(): Observable<Review[]> {
      return this.http.get<Review[]>(`${this.reviewUrl}/all`, {headers: this.getLoginHeader()});
    }

    editReview(s: string, id: number): Observable<Review> {
      return this.http.put<Review>(`${this.reviewUrl}/${id}/edit?ass=${s}`, {headers: this.getLoginHeader()});
    }
  //#endregion
  //#region Data check for data display
  ownCheck(a: Avatar): boolean {
    let temp = false;
     
    
    this.avatarlisttemp.value.forEach(x => {
      console.log(`${x.Id} og ${a.Id}`)
      if (x.Id === a.Id) {
      temp = true;
    }
    });
    this.isUserAvatarOwned.next(temp);
    console.log(temp);
  
    return temp; 
  }
  effectCheck() {
    let effect: string;
    switch (this.displayedAvatar.Effect) {
      case 0:
      effect = 'Increases Damage of Cards';
      break;

      case 1:
        effect = 'Decreases Damage Taken';
      break;

      case 2:
        effect = 'Reduces Mana Cost';
      break;

      case 3:
        effect = 'Increases HP of party';
      break;

      default:
      effect = 'Unknown what a mystery!';
        break;
  }
  this.avatarEffect.next(effect);
}

// #endregion
  //#region Deck API requests
    getUserDeck(): Observable<string[]> {
      if(this.loggedin.value) {
      return this.http.get<string[]>(this.decksUrl + '/all', {headers: this.getLoginHeader()});
      } else {
        console.log('Log in first');
      }
    }

    getDeckCards(name: string): Observable<Card[]> {
      if(this.loggedin.value) {
        return this.http.get<Card[]>(this.decksUrl + '/' + name, {headers: this.getLoginHeader()});
      } else {
        console.log('Log in first');
      }
      
    }

    postNewDeck(name: string, cardlist: Card[]): Observable<Card[]> {
      if(this.loggedin.value) {
         return this.http.post<Card[]>(this.decksUrl + '/new/' + name, cardlist, {headers: this.getLoginHeader()});
      } else {
        console.log('Log in first');
      }
      
    }

  //#endregion

    getLoginHeader(): HttpHeaders{
      if(this.loggedin) {
      let token = localStorage.getItem('token');
      let tokenJson = JSON.parse(token) as TokenModel;
      let headers = new HttpHeaders().set('Authorization', `Bearer ${tokenJson.access_token}`);
      return headers;
      }
    }

    getLoggedIn(): boolean {
      return this.loggedin.value;
    }
    setLoggedIn() {
      let temp = !this.loggedin.value;
      this.loggedin.next(temp);
      this.newFunc();
      this.router.navigate(['/dashboard']);

      
    }

    newFunc() {
      this.getOwnedAvatars().subscribe(x => {
        this.tempownedAvatars = x;
        console.log(`${x.length} stök sótt`);
        this.avatarlisttemp.next(this.tempownedAvatars);
        console.log('Búinn að sækja Avatars');
    });
      this.getReviewByPlayer().subscribe(x => {
      this.reviewsbyplayer.next(x);
    });
    }

   /* giveAvatars(user: string) {
      let avlist;
      this.getAvatars().subscribe(x => {
        avlist = x;
        console.log(x);
      },
     err => console.log(err),
     () => {this.giveDefaultAvatars(user, avlist)}
      );
    } */

   /* giveDefaultAvatars(user: string, avlist: Avatar[]) {
      let defaultAvatars: number[];
      for (let index = 0; index !== 2; index++) {
        defaultAvatars.push(avlist[index].Id);
        console.log(index);
      }
      console.log('test');
      // this.postAvatarlist(defaultAvatars, user).subscribe();
    } */
}
