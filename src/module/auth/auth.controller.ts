import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersSchema } from '../users/schema/user.schema';
import { LoginUsers, UsersDto } from '../users/dto/users.dto';
import { AuthSchema } from './schema/auth.schema';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';

class LoginDto {
  @ApiProperty({ default: 'example@email.com' })
  email: string;

  @ApiProperty({ default: 'password123' })
  password: string;
}

class RegisterDto {
  @ApiProperty({ default: 'example@email.com' })
  email: string;

  @ApiProperty({ default: 'password123' })
  password: string;

  @ApiProperty({ default: 'password123' })
  confirmPassword: string;

  @ApiProperty({ default: 'Bruno' })
  name: string;
}

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() createUserDto: UsersDto) {
    try {
      if (createUserDto.password !== createUserDto.confirmPassword) {
        throw new Error('Password and confirmPassword do not match.');
      }

      UsersSchema.parse(createUserDto);

      return this.authService.register(createUserDto);
    } catch (error) {
      throw new Error(`Validation failed: ${error.message}`);
    }
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginUser: LoginUsers) {
    try {
      AuthSchema.parse(loginUser);

      return this.authService.login(loginUser);
    } catch (error) {
      throw new Error(`Validation failed: ${error.message}`);
    }
  }
}
