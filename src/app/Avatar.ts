export class Avatar {
    Id: number;
    Name: string;
    Effect: number;
    Hp: number;
    Lore: string;
    Phrase: string;
    Cost: number;
    constructor(name = '', effect = 0, hp = 0, lore = '', phrase = '', cost = 0) {
        this.Name = name,
        this.Effect = effect,
        this.Hp = hp,
        this.Lore = lore,
        this.Phrase = phrase,
        this.Cost = cost;
    }
}


