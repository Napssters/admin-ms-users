import { IsString, IsEmail, IsDate } from "class-validator";

export class updateUserRequestDTO {

    @IsString()
    fullname: string;

    @IsEmail()
    email: string; 

    @IsString()
    phone: string;

    @IsString()
    role: string; 

    @IsDate()
    updatedAt: Date; 
}