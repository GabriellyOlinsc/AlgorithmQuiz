import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { CreatePerformanceDto } from './dto/create-performance.dto';

@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Post()
  async create(@Body() createPerformanceDto: CreatePerformanceDto) {
    return this.performanceService.create(createPerformanceDto);
  }

  @Get('student/:studentId')
  async getByStudent(@Param('studentId') studentId: number) {
    return this.performanceService.getByStudent(studentId);
  }

  @Get('quiz/:quizId')
  async getByQuiz(@Param('quizId') quizId: number){
    return this.performanceService.getByQuiz(quizId);
  }
}
