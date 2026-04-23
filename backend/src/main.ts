import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // --- Swagger 설정 시작 ---
  const config = new DocumentBuilder()
    .setTitle('BeomLog API')
    .setDescription('범로그 포트폴리오 프로젝트를 위한 API 문서입니다.')
    .setVersion('1.0')
    .addTag('posts')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // --- Swagger 설정 끝 ---

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
