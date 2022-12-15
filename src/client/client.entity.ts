import { ProjectEntity } from 'src/project/project.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contact: number;

  @Column()
  email: string;

  @Column()
  country: string;

  @OneToOne(() => ProjectEntity)
  @JoinColumn()
  project: string;
}
