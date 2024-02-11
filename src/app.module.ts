import { Module } from '@nestjs/common';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { EmailModule } from './module/email/email.module';

@Module({
  imports: [UsersModule, AuthModule, EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
