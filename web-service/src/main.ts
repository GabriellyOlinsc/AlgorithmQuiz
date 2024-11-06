import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );

  const config = new DocumentBuilder()
    .addBearerAuth() 
    .setTitle('Quiz API')
    .setDescription(
      'Documentação de API de MPS. Essa API é utilizada para gerenciar um jogo de Quiz voltado para ensino de Lógica de Programação. ' +
        ' Abaixo estão os endpoints disponíveis e detalhes sobre cada um para integrar com o frontend da aplicação.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3020);
}
bootstrap();
