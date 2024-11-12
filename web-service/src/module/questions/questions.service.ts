import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateQuestionDto) {
    const { statement, level, alternatives } = data;

    const question = await this.prisma.question.create({
      data: {
        statement,
        level,
        alternatives: {
          create: alternatives.map((alternative) => ({
            statement: alternative.statement,
            correct: alternative.correct,
          })),
        },
      },
      include: {
        alternatives: true,
      },
    });

    return { status: 200, data: question };
  }

  async findAll() {
    const questions = await this.prisma.question.findMany({
      include: {
        alternatives: {
          select: {
            id: true,
            statement: true,
            correct: true,
            questionId: false,
          },
        },
      },
    });
    if (!questions.length) {
      throw new NotFoundException('No question registered.');
    }
    return {status: 200, data: questions};
  }

  async findOne(id: number) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: { alternatives: true },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return {status: 200, data: question};
  }

  async remove(id: number) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: {
        phases: true, 
      },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    if (question.phases.length > 0) {
      throw new BadRequestException(
        'This question is linked with an active phase.'
      );
    }

    await this.prisma.alternative.deleteMany({
      where: { questionId: id },
    });

    const deletedQuestion = await this.prisma.question.delete({
      where: { id },
    });

    return {status: 200, data: deletedQuestion}
  }
}
