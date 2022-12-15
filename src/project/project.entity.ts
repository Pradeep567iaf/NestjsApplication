import { cp } from 'fs';
import { ClientEntity } from 'src/client/client.entity';
import { ProjectEnum } from 'src/enum/projectstatus.enum';
import { Technologies } from 'src/enum/technologies.enum';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

@Entity('Project')
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200, unique: true })
  title: string;

  @Column({ type: 'enum', enum: Technologies, default: Technologies.PENDING })
  technologies: Technologies[];

  @OneToMany(() => UserEntity, (user) => user.projects, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  developers: UserEntity[];

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'managerId' })
  managerid: number;

  @Column('varchar', { nullable: true })
  tester: string;

  @Column({
    type: 'enum',
    enum: ProjectEnum,
    default: ProjectEnum['NOT STARTED'],
  })
  status: ProjectEnum;

  @OneToOne(() => ClientEntity)
  @JoinColumn()
  clientid: number;
}
