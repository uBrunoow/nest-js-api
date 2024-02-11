import { Injectable } from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { PrismaService } from 'src/database/PrismaService';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const allUsers = await this.prisma.user.findMany();
    return allUsers;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error(`User with EMAIL ${email} not found`);
    }

    return user;
  }

  async updateUser(id: string, updateUserDto: UsersDto) {
    const UserExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!UserExists) {
      throw new Error('User does not exists!');
    }

    const { password } = updateUserDto;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateUserDto.password = hashedPassword;
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return {
      message: 'User updated successfully!',
      user: updatedUser,
    };
  }

  async removeUser(id: string) {
    const UserExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!UserExists) {
      throw new Error('User does not exists!');
    }

    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    return {
      message: 'User removed successfully!',
      user: deletedUser,
    };
  }
}
