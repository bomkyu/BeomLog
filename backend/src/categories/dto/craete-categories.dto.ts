import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriesDto {
  @ApiProperty({ example: '카테고리', description: '집어넣을 카테고리' })
  name: string;
}
