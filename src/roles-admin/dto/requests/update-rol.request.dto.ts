import { IsString, IsEmail, IsDate } from "class-validator";

export class UpdateRolRequestDTO {

    @IsString()
    name: string;

    @IsDate()
    updatedAt: Date;
}