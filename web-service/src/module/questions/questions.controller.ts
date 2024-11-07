import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Roles } from 'src/core/decorator/roles.decorator';
import { Role } from 'src/core/role.enum';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @Roles(Role.Teacher)
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionsService.create(createQuestionDto);
  }

  @Get()
  async findAll() {
    return await this.questionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.questionsService.findOne(id);
  }
  
  @Delete(':id')
  @Roles(Role.Teacher)
  async remove(@Param('id') id: string) {
    return await this.questionsService.remove(+id);
  }
}
