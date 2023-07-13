import { Module } from '@nestjs/common';
import { UserAutenticationModule } from './user-autentication/autentication.module';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user-autentication/user-services/users/user.module';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT, 10),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE
      }),
      UserAutenticationModule, UserModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
