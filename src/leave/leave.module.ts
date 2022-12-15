import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from 'src/project/project.module';
import { LeaveController } from './leave.controller';
import { leaveEntity } from './leave.entity';
import { LeaveService } from './leave.service';

@Module({
  imports: [TypeOrmModule.forFeature([leaveEntity])],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}
