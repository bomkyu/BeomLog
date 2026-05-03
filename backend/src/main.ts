import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import session from 'express-session';

async function bootstrap() {
  // <NestExpressApplication> 제네릭 추가
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: [
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
      // 도메인 주소
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.set('trust proxy', 1); //Nginx 프록시를 신뢰

  // 1. 세션 미들웨어 설정
  app.use(
    session({
      secret:
        configService.get<string>('SESSION_SECRET') ||
        'temporary-dev-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        // 배포시 true로 변경해야함
        secure: true,
        maxAge: 3600000, // 1시간 (밀리초 단위)
      },
    }),
  );

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
