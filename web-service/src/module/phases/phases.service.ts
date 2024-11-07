import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreatePhaseDto } from './dto/create-phases.dto';

@Injectable()
export class PhasesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const phases = await this.prisma.phase.findMany({
      include: {
        questions: true,
      },
    });
    if (!phases.length) {
      throw new NotFoundException('No phases registered.');
    }
    return phases;
  }

  async findOne(id: number) {
    const phase = await this.prisma.phase.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    });

    if (!phase) {
      throw new NotFoundException(`Phase with ID ${id} not found`);
    }

    return phase;
  }

  async create(createPhaseDto: CreatePhaseDto) {
    const { name, questionIds } = createPhaseDto;

    const questions = await this.prisma.question.findMany({
      where: {
        id: { in: questionIds },
      },
    });

    if (questions.length !== 4) {
      throw new BadRequestException('A phase must have 4 questions.');
    }

   const phase = await this.prisma.phase.create({
      data: {
        name: name,
        questions: {
          connect: questionIds.map((id) => ({ id })),
        },
      },
    });

    return phase;
  }

  async delete(id: number) {
    //todo: verificar se essa fase esta linkada com alguma coisa
    const phase = await this.prisma.phase.findUnique({
      where: { id },
    });

    if (!phase) {
      throw new NotFoundException(`Phase with ID ${id} not found`);
    }

    await this.prisma.phase.delete({
      where: { id },
    });

    return { message: `Phase with ID ${id} deleted successfully` };
  }
}
