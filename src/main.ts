import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    transports: [
      new transports.Console({
        format: format.combine(
          format.cli(),
          format.splat(),
          format.timestamp(),
          format.printf((info) => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
          }),
        ),
      }),
    ],
  });
  const app = await NestFactory.create(AppModule, { logger });
  app.enableCors({
    origin: '*', // Allow access from any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Content-Type, Accept, Authorization, apollo-require-preflight',
  });
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  await app.listen(3000);
}
bootstrap();
