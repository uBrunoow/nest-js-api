import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';
import { UsersUpdateSchema } from './schema/user.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('users/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put('users/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UsersDto) {
    try {
      UsersUpdateSchema.parse(updateUserDto);

      return this.usersService.updateUser(id, updateUserDto);
    } catch (error) {
      throw new Error(`Validation failed: ${error.message}`);
    }
  }

  @Delete('users/:id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
