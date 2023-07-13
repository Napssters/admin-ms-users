import { IsString, IsEmail, IsBoolean, IsDate } from "class-validator";

export class CreateRolDTO {

    @IsString()
    name: string;
}