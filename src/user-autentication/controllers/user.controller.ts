import { Controller } from '@nestjs/common';
import { UserService } from '../user-services/user.service';

@Controller()
export class UserController {

    constructor(private userService: UserService) { }

    
 }
