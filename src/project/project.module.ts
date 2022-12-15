import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';
import { UserModule } from 'src/user/user.module';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    UserModule,
    ProjectModule,
    ClientModule,
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
