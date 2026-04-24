import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  // <NestExpressApplication> 제네릭 추가
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

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
