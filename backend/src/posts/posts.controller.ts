import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('posts') // Swagger에서 'posts' 그룹화
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: '게시글 작성' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 상세 조회' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Get()
  async getPosts(
    @Query('page') page: string = '1',
    @Query('category') category?: string,
  ) {
    return this.postsService.findAll({
      page: Number(page),
      category: category === 'all' ? undefined : category,
    });
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // 파일이 저장될 실제 폴더 경로
        filename: (req, file, callback) => {
          // 파일명이 겹치지 않게 타임스탬프 + 랜덤값으로 생성
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = `http://localhost:4000/uploads/${file.filename}`;
    return { url: imageUrl };
  }
}
