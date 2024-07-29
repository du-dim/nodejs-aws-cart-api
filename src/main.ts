import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import helmet from 'helmet';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });
  app.use(helmet());

  await app.listen(port);
}

// Если приложение запускается локально, выполнить bootstrap
if (!process.env.AWS_EXECUTION_ENV) {
  bootstrap().then(() => {
    console.log('App is running on %s port', port);
  });
}

export const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });
  app.use(helmet());
  await app.init();
  return app;
};
