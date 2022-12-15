import { Role } from 'src/enum/role.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ProjectEntity } from 'src/project/project.entity';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  Designation: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.Employee })
  role: Role[];

  @Column()
  address: string;

  @Column()
  contact_number: number;

  @ManyToOne(() => ProjectEntity, (project) => project.developers, {})
  projects: ProjectEntity;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
