import { IsString, IsEmail } from "class-validator";

export class SigninDTO{

    @IsEmail()
    email: string;

    @IsString()
    password: string;

}