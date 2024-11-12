import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { calculateScore } from 'src/utils/score';

@Injectable()
export class PerformanceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPerformanceDto: CreatePerformanceDto) {
    const score = calculateScore(createPerformanceDto.correctAnswer);

    const performance = await this.prisma.performance.create({
      data: {
        ...createPerformanceDto,
        score,
      },
    });

    return { status: 200, data: performance };
  }

  async getByStudent(studentId: number) {
    const performance = await this.prisma.performance.findMany({
      where: { studentId },
    });

    if (!performance) {
      throw new NotFoundException('Performance not found.');
    }

    return { status: 200, data: performance };
  }

  async getByQuiz(quizId: number) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    }

    const perfomances = await this.prisma.performance.findMany({
      where: { quizId },
      include: {
        student: { select: { id: true, name: true } },
      },
    });

    return { status: 200, data: perfomances };
  }
}
