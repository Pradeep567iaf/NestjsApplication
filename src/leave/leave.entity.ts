import { Leave } from 'src/enum/leave.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Leave')
export class leaveEntity {
  @PrimaryGeneratedColumn()
  Requestid: number;

  @Column()
  employeeid: number;

  @Column()
  employeename: string;

  // @Column({
  //   nullable: true,
  //   default: formatDate(new Date()),
  // })
  // RequestDate: string;

  @CreateDateColumn({ nullable: true, default: formatDate(new Date()) })
  RequestDate: string; // Creation date

  @CreateDateColumn({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  RequestedTime: string; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @DeleteDateColumn()
  deleted_at: Date; // Deletion date

  // @Column({
  //   nullable: true,
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // RequestedTime: string;

  // @DeleteDateColumn()
  // @Column({ nullable: true, name: 'deleted_at' })
  // deletedAt?: Date;

  // @Column({ type: 'boolean', default: false, select: false })
  // isDeleted!: boolean;

  // @UpdateDateColumn({ select: false })
  // updatedAt!: Date;

  @Column()
  Reason: string;

  @Column({ type: 'enum', enum: Leave, default: Leave.PENDING })
  status: Leave;
}
export function formatDate(date) {
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 101).toString().substring(1);
  var day = (date.getDate() + 100)
    .toString()
    .substring(1)
    .replace(/(^|-)0+/g, '$1');
  return month + '/' + day + '/' + year;
}
