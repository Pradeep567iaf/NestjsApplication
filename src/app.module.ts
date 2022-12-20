import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { ProjectEntity } from './project/project.entity';
import { LeaveModule } from './leave/leave.module';
import { leaveEntity } from './leave/leave.entity';
import { ClientModule } from './client/client.module';
import { ClientController } from './client/client.controller';
import { ClientEntity } from './client/client.entity';
import { UserSubscriber } from './subscribers/usersubscriber';
import { AdmintokenChecker } from './middleware/admintokenmiddleware';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'TechCompany',
      entities: [UserEntity, ProjectEntity, leaveEntity, ClientEntity],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    ProjectModule,
    LeaveModule,
    ClientModule,
  ],

  controllers: [AppController, ClientController],
  providers: [AppService, UserSubscriber],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdmintokenChecker)
      .forRoutes({ path: '*', method: RequestMethod.POST });
  }
}
