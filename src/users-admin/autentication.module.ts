import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserAutenticationController } from './controllers/auth.controller';
import { AuthUserService } from './user-services/auth-user.service';
import { UserModule } from './users/user.module';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [AuthUserService],
    controllers: [UserAutenticationController],
    exports: [ PassportModule],
  })
export class UserAutenticationModule {}
