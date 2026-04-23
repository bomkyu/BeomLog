import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { TagsService } from 'src/tags/tag.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private readonly tagsService: TagsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const {
      title,
      summary,
      content,
      categoryId,
      tags: tagNames,
      thumbnail,
    } = createPostDto;

    // 1. 태그 처리: 있으면 가져오고 없으면 생성 (TagsService 활용)
    // tagNames가 ["React", "NestJS"] 같은 배열이라고 가정
    const tags =
      tagNames && tagNames.length > 0
        ? await this.tagsService.findOrCreateTags(tagNames)
        : [];

    // 2. 게시글 객체 생성
    const newPost = this.postsRepository.create({
      title,
      summary: summary || title || '요약 없음',
      content,
      thumbnail,
      category: { id: categoryId }, // ID만으로 관계 연결 가능
      tags, // 위에서 처리한 태그 객체 배열 연결
    });

    // 3. 최종 저장
    return await this.postsRepository.save(newPost);
  }

  async findAll() {
    return await this.postsRepository.find({
      relations: ['category', 'tags'],
      order: { id: 'DESC' },
    });
  }

  // 상세 보기 (ID로 하나만 가져오기)
  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['category', 'tags'],
    });
    if (!post) throw new NotFoundException('존재하지 않는 게시글입니다.');
    return post;
  }
}
