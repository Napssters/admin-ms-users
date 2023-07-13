import { IsString, IsEmail, IsDate } from "class-validator";

export class updateRolRequestDTO {

    @IsString()
    name: string;

    @IsDate()
    updatedAt: Date;
}