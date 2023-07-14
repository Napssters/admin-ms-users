import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/users.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { uuid } from 'uuid';
import { SignInDTO } from '../dto/sign-In.dto';
import { SignUpDTO } from '../dto/sign-up.dto';
import { AuthToken } from 'src/models/core/auth-token.interface';

@Injectable()
export class AuthUserService {

    constructor(private readonly usersService: UserService) { }

    async signup(signup: SignUpDTO): Promise<User> {
        const hashedPassword = await bcrypt.hash(signup.password, 10);

        const user = await this.usersService.create({
            id: uuid,
            fullname: signup.fullname,
            email: signup.email,
            password: hashedPassword,
            phone: signup.phone,
            role: signup.role,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return user;
    }

    async signin(signIn: SignInDTO): Promise<AuthToken> {
        const user = await this.usersService.findByEmail(signIn.email);

        if (!user) {
            throw new UnauthorizedException('Invalid email');
        }

        console.log(" no db: ", signIn.password, " db: ", user.password)
        const passwordIsValid = await bcrypt.compare(
            signIn.password,
            user.password,
        );

        if (!passwordIsValid) {
            throw new UnauthorizedException('Invalid password');
        }

        const token = this.generateToken(user);

        return {
            accessToken: token,
            expiresIn: '1d',
            message: 'Successfully logged in',
            status: true,
        };
    }

    private generateToken(user: User): string {
        const payload = { username: user.email, userId: user.id };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    }
    async validateUser(email: string): Promise<User> {
        const user = await this.usersService.findByEmail(email);

        if (user != null) {
            return user;
        }

        return null;
    }
}
