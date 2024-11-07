import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateQuestionDto) {
    const { statement, level, alternatives } = data;

    return await this.prisma.question.create({
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
    return questions;
  }

  async findOne(id: number) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: { alternatives: true },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  async remove(id: number) {
    //TODO: bloquear se a pergunta está linkada com alguma fase.
    const question = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    await this.prisma.alternative.deleteMany({
      where: { questionId: id },
    });

    return  this.prisma.question.delete({
      where: { id },
    });
  }
}
