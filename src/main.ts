import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('COMPANY MANAGEMENT')
  .setDescription('MANAGE COMPANY DAY TO DAY WORK EASILY')
  .setVersion('1.0')
  .addTag('MANAGEMENT API')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
