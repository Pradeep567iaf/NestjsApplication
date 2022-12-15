import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  providers: [ClientService],
  controllers: [ClientController],
  exports: [ClientService],
})
export class ClientModule {}
