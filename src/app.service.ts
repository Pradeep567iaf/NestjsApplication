import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    return 'Hello World!';
  }
  // @Cron(CronExpression.EVERY_30_SECONDS)
  // handleCron() {
  //   const date = new Date();
  //   this.logger.debug(
  //     'called after every 30 seconds',
  //     date.toLocaleDateString(),
  //   );
  // }
}
