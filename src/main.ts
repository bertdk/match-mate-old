import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config as env } from 'config';

import { AppModule } from './app.module';

const bootstrap = async () => {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  app.setGlobalPrefix('api');

  initializeSwagger(app);

  const port = env.port || 4000;
  await app.listen(port, () => {
    console.info(`=================================`);
    console.info(`🚀 http://localhost:${port}/docs`);
    console.info(`=================================`);
  });
};

const initializeSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Match Mate')
    .setDescription('The Match Mate API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      defaultModelsExpandDepth: -1,
      syntaxHighlight: {
        activate: true,
        theme: 'arta',
      },
      tryItOutEnabled: true,
      queryConfigEnabled: true,
    },
    customfavIcon: '/static/favicon.ico',
  });
};

(async () => {
  await bootstrap();
})().catch(e => console.error(e));
