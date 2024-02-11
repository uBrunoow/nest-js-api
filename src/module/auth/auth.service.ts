// auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { JwtUserDto, LoginUsers, UsersDto } from '../users/dto/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(UserData: UsersDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userDataWithoutConfirmPassword } = UserData;

    const UserExists = await this.prisma.user.findFirst({
      where: {
        email: UserData.email,
      },
    });

    if (UserExists) {
      throw new Error('User already exists!');
    }

    const hashedPassword = await bcrypt.hash(
      userDataWithoutConfirmPassword.password,
      10,
    );

    const CreateUser = await this.prisma.user.create({
      data: {
        ...userDataWithoutConfirmPassword,
        password: hashedPassword,
      },
    });

    return {
      message: 'User created successfully!',
      user: CreateUser,
    };
  }

  async login(LoginUsers: LoginUsers) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: LoginUsers.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(
      LoginUsers.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const accessToken = this.generateAccessToken(user);

    return { message: 'User logged successfully!', accessToken, user };
  }

  private generateAccessToken(user: JwtUserDto) {
    const payload = { sub: user.id, username: user.name };
    return this.jwtService.sign(payload);
  }

  validateToken(token: string): boolean {
    try {
      this.jwtService.verify(token.replace('Bearer ', ''));
      return true;
    } catch (error) {
      return false;
    }
  }

  decodeToken(token: string): any {
    try {
      return this.jwtService.decode(token.replace('Bearer ', ''));
    } catch (error) {
      return null;
    }
  }

  generateResetToken(userId: string): string {
    const payload = { sub: userId, purpose: 'reset-password' };

    const expiresIn = '1h';

    return this.jwtService.sign(payload, { expiresIn });
  }
}
