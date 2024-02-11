import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class UsersDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must contain at least 8 characters, including one lowercase letter, one uppercase letter, and one digit.',
  })
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
  avatarUrl?: string;
}

export type LoginUsers = {
  email: string;
  password: string;
};

export type JwtUserDto = {
  id?: string;
  name: string;
};
