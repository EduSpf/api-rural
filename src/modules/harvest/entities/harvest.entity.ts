import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from '../../property/entities/property.entity';
import { Crop } from '../../crop/entities/crop.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Harvest {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  year: number;

  @ManyToOne(() => Property, (property) => property.harvests, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => Property })
  property: Property;

  @OneToMany(() => Crop, (crop) => crop.harvest)
  crops: Crop[];
}
