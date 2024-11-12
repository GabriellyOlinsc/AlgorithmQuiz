import { $Enums } from '@prisma/client';

const validQuestionsCombination = {
  [$Enums.Level.BEGINNER]: [
    { beginner: 3, intermediate: 1, advanced: 0 },
    { beginner: 4, intermediate: 0, advanced: 0 },
  ],
  [$Enums.Level.INTERMEDIATE]: [
    { beginner: 2, intermediate: 2, advanced: 0 },
    { beginner: 2, intermediate: 1, advanced: 1 },
    { beginner: 1, intermediate: 3, advanced: 0 },
    { beginner: 1, intermediate: 2, advanced: 1 },
    { beginner: 0, intermediate: 4, advanced: 0 },
    { beginner: 0, intermediate: 3, advanced: 1 },
  ],
  [$Enums.Level.ADVANCED]: [
    { beginner: 1, intermediate: 0, advanced: 3 },
    { beginner: 1, intermediate: 1, advanced: 2 },
    { beginner: 0, intermediate: 2, advanced: 2 },
    { beginner: 0, intermediate: 1, advanced: 3 },
    { beginner: 0, intermediate: 0, advanced: 4 },
  ],
};

const validQuizCombination = {
  [$Enums.Level.BEGINNER]: [
    { beginner: 4, intermediate: 1, advanced: 0 },
    { beginner: 5, intermediate: 0, advanced: 0 },
  ],
  [$Enums.Level.INTERMEDIATE]: [
    { beginner: 3, intermediate: 2, advanced: 0 },
    { beginner: 3, intermediate: 1, advanced: 1 },
    { beginner: 2, intermediate: 2, advanced: 1 },
    { beginner: 2, intermediate: 3, advanced: 0 },
    { beginner: 1, intermediate: 3, advanced: 1 }, 
    { beginner: 1, intermediate: 4, advanced: 0 },
    { beginner: 0, intermediate: 3, advanced: 2 },
    { beginner: 0, intermediate: 4, advanced: 1 },
    { beginner: 0, intermediate: 5, advanced: 0 },
  ],
  [$Enums.Level.ADVANCED]: [
    { beginner: 1, intermediate: 0, advanced: 4 },
    { beginner: 1, intermediate: 1, advanced: 3 },
    { beginner: 1, intermediate: 2, advanced: 2 },
    { beginner: 0, intermediate: 2, advanced: 3 },
    { beginner: 0, intermediate: 1, advanced: 4 },
    { beginner: 0, intermediate: 0, advanced: 5 },
  ],
};

export function validateLevelDifficulty(
  level: $Enums.Level,
  data: string[],
  amount: number,
): boolean {
  if (data.length !== amount) return false;

  const levelCounts = {
    beginner: data.filter((d) => d === $Enums.Level.BEGINNER).length,
    intermediate: data.filter((d) => d === $Enums.Level.INTERMEDIATE).length,
    advanced: data.filter((d) => d === $Enums.Level.ADVANCED).length,
  };

  if (data.length === 5) {
    return validQuizCombination[level].some(
      (combo) =>
        combo.beginner === levelCounts.beginner &&
        combo.intermediate === levelCounts.intermediate &&
        combo.advanced === levelCounts.advanced,
    );
  } else
    return validQuestionsCombination[level].some(
      (combo) =>
        combo.beginner === levelCounts.beginner &&
        combo.intermediate === levelCounts.intermediate &&
        combo.advanced === levelCounts.advanced,
    );
}
