import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { PrismaService } from 'src/database/PrismaService';
import { EmailController } from './email.controller';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';

@Module({
  providers: [EmailService, PrismaService, UsersService, AuthService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
