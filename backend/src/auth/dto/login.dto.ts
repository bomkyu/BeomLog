import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin', description: '관리자 아이디' })
  username!: string;

  @ApiProperty({ example: 'password123', description: '관리자 비밀번호' })
  password!: string;
}
