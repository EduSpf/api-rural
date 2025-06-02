import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Harvest } from '../../harvest/entities/harvest.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Crop {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @ManyToOne(() => Harvest, (harvest) => harvest.crops, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => Harvest })
  harvest: Harvest;
}
