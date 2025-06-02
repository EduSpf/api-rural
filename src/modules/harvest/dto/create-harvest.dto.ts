import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHarvestDto {
  @IsInt()
  @ApiProperty()
  year: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ description: 'UUID da propriedade associada' })
  propertyId: string;
}
