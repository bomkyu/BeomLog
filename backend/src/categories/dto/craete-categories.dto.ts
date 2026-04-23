import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'React', description: '카테고리 이름' })
  name: string;
}
