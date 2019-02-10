import { Avatar } from "./Avatar";

export class AvatarOwn extends Avatar {
    isOwned: boolean;

    constructor(a:Avatar, b: boolean) {
        super();
        this.Name = a.Name,
        this.Phrase = a.Phrase,
        this.Cost = a.Cost,
        this.Effect = a.Effect,
        this.Hp = a.Hp,
        this.Id = a.Id,
        this.Lore = a.Lore,
        this.isOwned = b
    }
}
