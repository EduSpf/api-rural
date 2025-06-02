import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from '../../property/entities/property.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Producer {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'CPF ou CNPJ' })
  document: string;

  @OneToMany(() => Property, (property) => property.producer)
  properties: Property[];
}
