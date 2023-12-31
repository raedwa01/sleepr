import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

async function bootstrap() {
  // somewhere in your code
  mongoose.set('debug', true);
  const app = await NestFactory.create(ReservationsModule);
  //  app.connectMicroservice({ transport: Transport.TCP });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  const logger = app.get(Logger);
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  logger.error(configService.get('MONGODB_URI'));
  //await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
