import {
  Controller,
  Post,
  Body,
  Session,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
  Get,
  Req,
} from '@nestjs/common';
import { Session as ExpressSession } from 'express-session';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import express from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '관리자 로그인' })
  login(
    @Body() loginDto: LoginDto,
    @Session() session: ExpressSession & { admin?: any },
  ) {
    const { username, password } = loginDto;

    if (username === 'admin' && password === process.env.ADMIN_PASSWORD) {
      // 세션에 데이터 저장
      session.admin = {
        isLoggedIn: true,
        user: username,
      };
      return { success: true, message: '로그인 성공' };
    }

    throw new UnauthorizedException('아이디 또는 비밀번호가 틀렸습니다.');
  }

  @Post('logout')
  @ApiOperation({ summary: '로그인 해제' })
  logout(@Session() session: ExpressSession) {
    session.destroy((err) => {
      if (err) throw new Error('로그아웃 실패');
    });
    return { success: true };
  }

  @Get('check')
  @ApiOperation({ summary: '관리자 세션 확인' })
  checkAdmin(@Req() req: express.Request) {
    if (req.session && req.session.admin) {
      return { isAdmin: true };
    }
    return { isAdmin: false };
  }
}
