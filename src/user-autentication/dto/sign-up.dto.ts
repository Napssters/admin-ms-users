import { IsString, IsEmail, IsBoolean, IsDate } from "class-validator";

export class SignUpDTO{

    @IsString()
    id: string; 

    @IsString()
    fullname: string;

    @IsEmail()
    email: string; 
    
    @IsString()
    password: string; 

    @IsString()
    phone: string;

    @IsString()
    role: string; 

    @IsBoolean()
    isDeleted: boolean; 
    
    @IsDate()
    createdAt: Date; 

    @IsDate()
    updatedAt: Date; 

    constructor(data: { email: string; password: string }) {
        this.email = data.email;
        this.password = data.password;
    }

}