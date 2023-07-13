import { IsString, IsEmail } from "class-validator";

export class SignInDTO{

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    constructor(data: { email: string; password: string }) {
        this.email = data.email;
        this.password = data.password;
    }

}