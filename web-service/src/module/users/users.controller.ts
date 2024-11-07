import {
  Controller,
  Get,
  Param,
  Headers,
  Post,
  Body,
  Req,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from 'src/core/role.enum';
import { Roles } from 'src/core/decorator/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @Roles(Role.Teacher)
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  @Roles(Role.Teacher)
  async findOne(@Param('id') id: number) {
   return await this.usersService.findOne(id);
  }

  @Post('')
  @Roles(Role.Teacher) 
  async createUser(@Body() createUserDto: CreateUserDto, @Req() req) {
    const requesterRole = req.user.role;
    return this.usersService.createUser(createUserDto, requesterRole);
  }

  @Delete('/:id')
  @Roles(Role.Teacher)
  async deleteUser(@Param('id') id: number) {
    return await this.usersService.deleteUser(id);
   }
}
