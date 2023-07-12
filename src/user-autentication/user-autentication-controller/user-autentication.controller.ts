import { Controller, Post, Put, Patch, Get } from '@nestjs/common';
import { UserService } from '../user-services/user.service';

@Controller('user')
export class UserAutenticationController {
    constructor(private userService: UserService) { }

    @Post('create-user')
    createUser(): string {
        return this.userService.getUsers();
    }

    @Put('update-user')
    updateUsers(): string {
        return this.userService.getUsers();
    }

    @Patch('delete-user')
    deleteUsers(): string {
        return this.userService.getUsers();
    }

    @Get('update-user')
    autenticateUsers(): string {
        return this.userService.getUsers();
    }
}
