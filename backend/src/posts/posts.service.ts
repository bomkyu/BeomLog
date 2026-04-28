import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { TagsService } from 'src/tags/tag.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Tag } from 'src/tags/entities/tags.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private readonly tagsService: TagsService,
    private readonly categoriesService: CategoriesService,

    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
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
      category: { id: categoryId }, // ID만으로 관계 연결 가능
      tags, // 위에서 처리한 태그 객체 배열 연결
    });

    // 3. 최종 저장
    return await this.postsRepository.save(newPost);
  }

  async findAll(query: { page: number; category?: string }) {
    const take = 6; // 한 페이지에 보여줄 글 개수
    const skip = (query.page - 1) * take;

    const queryBuilder = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category') // 카테고리 정보 포함
      .leftJoinAndSelect('post.tags', 'tags') // 태그 정보 포함
      .orderBy('post.createdAt', 'DESC') // 최신순 정렬
      .skip(skip)
      .take(take);

    // 카테고리 필터링 logic
    if (query.category) {
      // 카테고리 ID 혹은 이름으로 필터링
      queryBuilder.andWhere('category.id = :categoryId', {
        categoryId: query.category,
      });
    }

    const [posts, total] = await queryBuilder.getManyAndCount();

    return {
      posts,
      totalPages: Math.ceil(total / take),
    };
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

  //삭제로직
  async remove(id: number): Promise<boolean> {
    // 1. 글이 있는지 확인
    const post = await this.postsRepository.findOneBy({ id });

    if (!post) {
      throw new NotFoundException(`${id}번 게시글을 찾을 수 없습니다.`);
    }

    // 2. 삭제
    await this.postsRepository.delete(id);

    return true;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const { tags, ...rest } = updatePostDto;

    // 1. relations 옵션으로 기존 태그를 같이 메모리에 올려야 함!
    const post = await this.postsRepository.findOne({
      where: { id: Number(id) },
      relations: ['tags'],
    });

    if (!post) throw new NotFoundException('게시글이 없어요.');

    // 2. 일반 필드(title, content 등) 업데이트
    Object.assign(post, rest);

    if (tags) {
      const tagEntities = await Promise.all(
        tags.map(async (tagName: string) => {
          // 💡 1. 일단 DB에 이 태그가 있는지 기막히게 찾아봅니다.
          let tag = await this.tagsRepository.findOneBy({ name: tagName });

          // 💡 2. 없을 때만 새로 만듭니다! (이미 있으면 위에서 찾은 tag를 그대로 사용)
          if (!tag) {
            tag = this.tagsRepository.create({ name: tagName });
            // cascade 설정이 불안하면 안전하게 미리 저장
            tag = await this.tagsRepository.save(tag);
          }

          return tag;
        }),
      );

      post.tags = tagEntities;
    }

    // 4. 최종 저장
    return await this.postsRepository.save(post);
  }
}
