import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>, // DB 관리자(Repository)를 불러옴
  ) {}

  // 글 생성 로직
  async create(createPostDto: any) {
    const newPost = this.postsRepository.create(createPostDto);
    return await this.postsRepository.save(newPost);
  }

  // 모든 글 가져오기 로직
  async findAll() {
    return await this.postsRepository.find({
      relations: ['category', 'tags'], // 카테고리와 태그 정보도 같이 가져오기
    });
  }
}
