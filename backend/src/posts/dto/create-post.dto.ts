import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: '게시글 제목', description: '글의 제목입니다.' })
  title: string;

  @ApiProperty({
    example: '글 요약내용',
    description: '카드에 보일 요약문입니다.',
  })
  summary: string;

  @ApiProperty({ example: '본문 내용...', description: '마크다운 본문입니다.' })
  content: string;

  @ApiProperty({
    example: 'https://...',
    description: '썸네일 이미지 URL',
    required: false,
  })
  thumbnail?: string;

  @ApiProperty({ example: 1, description: '선택한 카테고리의 ID' })
  categoryId: number;

  @ApiProperty({
    example: ['Nextjs', 'Nestjs'],
    description: '태그 리스트',
    required: false,
  })
  tags?: string[];
}
