import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { Public } from '../auth/decorator/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get('/findAll')
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number, @Headers('Authorization') auth) {
  //  return await this.usersService.findOne(id);
  }
}
