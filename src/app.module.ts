import { Module } from '@nestjs/common';
import { UserAutenticationModule } from './user-autentication/user-autentication.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './user-autentication/guards/auth.guard';

@Module({
  imports: [UserAutenticationModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
