import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'areaValidation', async: false })
export class AreaValidation implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const dto = args.object as any;
    return (
      dto.area_agriculture + dto.area_vegetation <= dto.area_total
    );
  }

  defaultMessage() {
    return 'A soma das áreas agricultável e vegetação não pode ultrapassar a área total.';
  }
}
