import { LoginModel } from "./login-model";

export class RegisterModel extends LoginModel {
    ConfirmPassword: string;
    constructor(e = "") {
        super();
        this.ConfirmPassword = e;
    }
}

