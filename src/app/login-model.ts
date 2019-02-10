export class LoginModel {
    Email: string;
    Password: string;
    constructor(e = '') {
        this.Email = e,
        this.Password = e;
    }
}
