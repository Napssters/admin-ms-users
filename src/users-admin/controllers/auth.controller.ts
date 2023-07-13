import { Controller, Post, Body } from '@nestjs/common';
import { AuthToken } from 'src/models/core/auth-token.interface';
import { User } from 'src/entities/users.entity';
import { AuthUserService } from '../user-services/auth-user.service';
import { SignUpDTO } from '../dto/sign-up.dto';
import { SignInDTO } from '../dto/sign-In.dto';

@Controller('auth')
export class UserAutenticationController {
    constructor(private authUserService: AuthUserService) { }

    @Post('signup')
    async signup(@Body() signupDTO: SignUpDTO): Promise<User> {
        return this.authUserService.signup(signupDTO);
    }

    @Post('signin')
    async signin(@Body() signinDTO: SignInDTO): Promise<AuthToken> {
        return this.authUserService.signin(signinDTO);
    }
}
