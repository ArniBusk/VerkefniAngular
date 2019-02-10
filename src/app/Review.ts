import { Card } from './Card';

export class Review {
    Id: number;
    AvatarId: number;
    Asessment: string;
    Time: Date;
    UserId: string;

    constructor(a: string = '') {
        this.Asessment = a;
    }
}
