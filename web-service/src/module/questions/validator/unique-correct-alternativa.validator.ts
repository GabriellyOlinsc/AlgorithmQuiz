import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Alternative } from '../dto/create-question.dto';

@ValidatorConstraint({ name: 'UniqueCorrectAlternative', async: false })
export class UniqueCorrectAlternative implements ValidatorConstraintInterface {
  validate(alternatives: Alternative[], args: ValidationArguments) {
    if (!Array.isArray(alternatives)) {
        return false;
      }
    const correctCount = alternatives.filter((alt) => alt.correct).length;
    return correctCount === 1;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Only one alternative must be marked as correct';
  }
}
