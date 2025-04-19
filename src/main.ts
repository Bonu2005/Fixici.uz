import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Fixici.uz example')
    .setDescription('The fixici.uz API description')
    .setVersion('1.0')
    .addTag('fixici.uz')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // можно опустить, но помогает
        name: 'Authorization',
        description: 'Введите JWT токен в формате: Bearer {token}',
        in: 'header',
      },
      'access-token', // имя схемы безопасности
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
