import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAutomaticQuizDto, CreateManualQuizDto } from './dto/create-quiz.dto';
import { PrismaService } from '../database/prisma.service';
import { validateLevelDifficulty } from 'src/utils/level';
import { Level } from '@prisma/client';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  private findValidPhaseCombination(phases: { id: number; level: Level }[], level: Level) {
    const phaseCombinations = this.getPhaseCombinations(phases, 5);
    const validCombinations = [];

    for (const combination of phaseCombinations) {
      const phaseLevels = combination.map((phase) => phase.level);
      if (validateLevelDifficulty(level, phaseLevels, 5)) {
        validCombinations.push(combination);
      }
    }

    if (validCombinations.length > 0) {
      const randomIndex = Math.floor(Math.random() * validCombinations.length);
      return validCombinations[randomIndex];
    }
    return null;
  }

  private getPhaseCombinations(arr: any[], size: number) {
    const result: any[] = [];

    const combine = (tempArr: any[], start: number) => {
      if (tempArr.length === size) {
        result.push([...tempArr]);
        return;
      }
      for (let i = start; i < arr.length; i++) {
        tempArr.push(arr[i]);
        combine(tempArr, i + 1);
        tempArr.pop();
      }
    };

    combine([], 0);
    return result;
  }

  async createAutomaticQuiz(quizDto: CreateAutomaticQuizDto, teacherId: number){
    const { name, level } = quizDto;

    const phases = await this.prisma.phase.findMany({
      select: { id: true, level: true },
    });

    if (phases.length < 5) {
      throw new BadRequestException('Not enough phases available to create a quiz.');
    }

    const selectedPhases = this.findValidPhaseCombination(phases, level);
    if (!selectedPhases) {
      throw new BadRequestException(
        'No valid combination of phases meets the criteria for the selected quiz level.'
      );
    }

    const newQuiz = await this.prisma.quiz.create({
      data: {
        title: name,
        level,
        selectionMode: 'automatic',
        teacherId: teacherId,
        phases: {
          connect: selectedPhases.map((phase) => ({ id: phase.id })),
        },
      },
    });

    return { status: 200, data: newQuiz };
  }

  async createManualQuiz(
    createQuizDto: CreateManualQuizDto,
    teacherId: number,
  ) {
    const { name, phasesIds, level } = createQuizDto;

    const phases = await this.prisma.phase.findMany({
      where: { id: { in: phasesIds } },
      select: { id: true, level: true },
    });

    if (phases.length !== 5) {
      throw new BadRequestException('A quiz must have 5 valid phases.');
    }

    const phasesLevels = phases.map((p) => p.level);
    const isValid = validateLevelDifficulty(level, phasesLevels, 5);
    if (!isValid) {
      throw new BadRequestException(
        'The selected questions do not meet the criteria for the phase level',
      );
    }

    const newQuiz = await this.prisma.quiz.create({
      data: {
        title: name,
        level,
        selectionMode: 'manual',
        teacherId: teacherId,
        phases: {
          connect: phasesIds.map((id) => ({ id })),
        },
      },
    });

    return {status: 200, data: newQuiz };
  }

  async findAll() {
    const quizzes = await this.prisma.quiz.findMany({
      include: {
        phases: true,
      },
    });

    if (!quizzes) {
      throw new NotFoundException('Quiz not found');
    }
    return {status: 200, data: quizzes};
  }

  async findById(id: number) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        phases: {
          include: {
            questions: {
              include: {
                alternatives: true,
              },
            },
          },
        },
      },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return {status: 200, data: quiz};
  }

  async delete(id: number) {
    await this.findById(id);
    await this.prisma.quiz.update({
      where: { id: id },
      data: {
        phases: {
          set: [], 
        },
      },
    });

    await this.prisma.quiz.delete({
      where: { id: id },
    });
    return { status: 201, message: 'Quiz successfully deleted' };
  }

}
