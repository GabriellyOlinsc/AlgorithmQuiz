import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreatePhaseDto } from './dto/create-phases.dto';
import { validateLevelDifficulty } from 'src/utils/level';

@Injectable()
export class PhasesService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    const phases = await this.prisma.phase.findMany({
      include: {
        questions: true,
      },
    });
    if (!phases.length) {
      throw new NotFoundException('No phases registered.');
    }
    return { status: 200, data: phases };
  }

  async findOne(id: number) {
    const phase = await this.prisma.phase.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            alternatives: true, // Inclui as alternativas de cada questão
          },
        },
      },
    });

    if (!phase) {
      throw new NotFoundException(`Phase with ID ${id} not found`);
    }

    const transformedPhase = {
      ...phase,
      questions: phase.questions.map((question) => {
        const correctAlternative = question.alternatives.find((alt) => alt.correct);
        const res = correctAlternative?.id || null; // Define a constante `res` com o ID da alternativa correta
        return {
          ...question,
          correctAlternative: res,
        };
      }),
    };

    return { status: 200, data: transformedPhase };
  }

  async createPhaseManual(createPhaseDto: CreatePhaseDto) {
    const { name, questionIds, level } = createPhaseDto;

    const questions = await this.prisma.question.findMany({
      where: { id: { in: questionIds } },
      select: { id: true, level: true },
    });

    if (questions.length !== 4) {
      throw new BadRequestException('A phase must have 4 valid questions.');
    }

    const questionLevels = questions.map((q) => q.level);

    const isValid = validateLevelDifficulty(level, questionLevels, 4);
    if (!isValid) {
      throw new BadRequestException(
        'The selected questions do not meet the criteria for the phase level',
      );
    }
    const newPhase = await this.prisma.phase.create({
      data: {
        name,
        level,
        questions: {
          connect: questionIds.map((id) => ({ id })),
        },
      },
    });

    return { status: 200, data: newPhase };
  }

  async delete(id: number) {
    const phase = await this.prisma.phase.findUnique({
      where: { id },
      include: { quizzes: true },
    });

    if (!phase) {
      throw new NotFoundException(`Phase with ID ${id} not found`);
    }

    if (phase.quizzes.length > 0) {
      throw new BadRequestException(
        'The phase cannot be deleted because it is linked to a quiz',
      );
    }

    await this.prisma.phase.delete({
      where: { id },
    });

    return { status: 200, message: `Phase with ID ${id} deleted successfully` };
  }
}
