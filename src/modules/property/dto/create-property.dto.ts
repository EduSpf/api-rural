import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  Validate,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AreaValidation } from '../validators/area.validator';

export class CreatePropertyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  area_total: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  area_agriculture: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  area_vegetation: number;

  @ApiProperty()
  @IsUUID()
  producerId: string;

  @Validate(AreaValidation)
  customValidation: boolean;
}
