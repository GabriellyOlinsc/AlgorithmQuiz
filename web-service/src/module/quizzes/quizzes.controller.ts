import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateAutomaticQuizDto, CreateManualQuizDto } from './dto/create-quiz.dto';
import { Roles } from 'src/core/decorator/roles.decorator';
import { Role } from 'src/core/role.enum';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get()
  async findAll() {
    return await this.quizzesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.quizzesService.findById(Number(id));
  }

  @Post('/manual')
  @Roles(Role.Teacher)
  async createManualQuiz(@Body() createQuizDto: CreateManualQuizDto,  @Req() req) {
    return await this.quizzesService.createManualQuiz(createQuizDto, req.user['id']);
  }

  @Post('/automatic')
  @Roles(Role.Teacher)
  async createAutomaticQuiz(@Body() createQuizDto: CreateAutomaticQuizDto,  @Req() req) {
    return await this.quizzesService.createAutomaticQuiz(createQuizDto, req.user['id']);
  }

  @Delete(':id')
  @Roles(Role.Teacher)
  async delete(@Param('id') id: string) {
    return await this.quizzesService.delete(Number(id));
  }
}
