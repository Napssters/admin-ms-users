import { Controller, Get, Param, Put, Patch, Body } from '@nestjs/common';
import { UserService } from '../user-services/user.service';
import { User } from 'src/entities/users.entity';
import { updateUserRequestDTO } from '../dto/requests/update-user.request.dto';

@Controller()
export class UserController {

    constructor(private userService: UserService) { }

    @Get('find-user/:email')
    async findUser(@Param('email') email: string): Promise<User> {
        return this.userService.findByEmail(email);
    }

    @Put('update-user/:email')
    updateUsers(
        @Param('email') email: string, 
        @Body() updatedData: Partial<updateUserRequestDTO>
        ): Promise<User> {
        return this.userService.update(email, updatedData);
    }
    
    @Patch('delete-user')
    deleteUsers(@Param('email') email: string): Promise<string> {
        return this.userService.softDelete(email);
    }

 }
