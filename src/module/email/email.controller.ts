// auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';

class EmailDto {
  @ApiProperty({ default: 'example@email.com' })
  email: string;
}

@Controller('auth')
@ApiTags('Emails')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('send-reset-email')
  @ApiBody({ type: EmailDto })
  async sendResetEmail(
    @Body() data: { email: string },
  ): Promise<{ message: string }> {
    try {
      const user = await this.usersService.findUserByEmail(data.email);

      if (user) {
        const resetToken = this.authService.generateResetToken(user.id);
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}&id=${user.id}`;

        await this.emailService.sendResetPasswordEmail(data.email, resetLink);
      }

      return { message: 'Email was sent successfully' };
    } catch (error) {
      throw new Error(`Validation failed: ${error.message}`);
    }
  }
}
