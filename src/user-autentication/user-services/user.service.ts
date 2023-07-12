import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthToken } from 'src/models/core/auth-token.interface';
import { SigninDTO } from '../user-autentication-dto/user-auth.dto';
import { User } from 'src/database/entities/users.entity';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import   * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {

    constructor(private userRepository: Repository<User>) {}
    
    async signin(signIn: SigninDTO): Promise<AuthToken> {
        const user = await this.findByEmail(signIn.email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordIsValid = await bcrypt.compare(
            signIn.password,
            user.password,
        );

        if (!passwordIsValid) {
            throw new UnauthorizedException('Invalid credentials');
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
        const user = await this.findByEmail(email); 
     
        if (user != null) { 
          return user; 
        } 
     
        return null; 
      } 
    
    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { email } });
    }
    

    
}
