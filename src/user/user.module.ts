import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { DataSource } from 'typeorm';
import { UserSubscriber } from 'src/subscribers/usersubscriber';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],

  providers: [UserService, UserSubscriber],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
