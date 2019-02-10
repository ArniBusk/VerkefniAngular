import { Review } from './Review';

export class Card {
    Id: number;
    Name: string;
    Hp: number;
    Dps: number;
    Mana: number;
    Info: string;
    CardType: number;
    Reviews: Review[];

    constructor(name = '', hp = 0, dps = 0, mana = 0, info = '', cardtype = 0, review = []) {
        this.Name = name,
        this.Hp = hp,
        this.Dps = dps,
        this.Mana = mana,
        this.Info = info,
        this.CardType = cardtype,
        this.Reviews = review;
    }
}
