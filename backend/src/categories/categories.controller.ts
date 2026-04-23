import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/craete-categories.dto';

@ApiTags('Categories') // Swagger에서 그룹화
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: '새 카테고리 생성' })
  @ApiResponse({ status: 201, description: '생성 성공' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: '모든 카테고리 목록 조회' })
  findAll() {
    return this.categoriesService.findAll();
  }
}
