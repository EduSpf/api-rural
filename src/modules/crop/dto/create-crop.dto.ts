import { IsNotEmpty, IsUUID, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCropDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID da safra associada' })
  harvestId: string;
}
