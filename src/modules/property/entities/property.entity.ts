import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Producer } from '../../producer/entities/producer.entity';
import { Harvest } from '../../harvest/entities/harvest.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column('float')
  area_total: number;

  @Column('float')
  area_agriculture: number;

  @Column('float')
  area_vegetation: number;

  @ManyToOne(() => Producer, (producer) => producer.properties, { eager: true })
  producer: Producer;

  @OneToMany(() => Harvest, (harvest) => harvest.property)
  harvests: Harvest[];
}
