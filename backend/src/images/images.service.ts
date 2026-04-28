import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostImage } from './entities/image.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(PostImage)
    private readonly imagesRepository: Repository<PostImage>,
  ) {}

  // 여러 장의 이미지를 저장하는 함수
  async createImages(
    post: Post,
    urls: string[],
    thumbnailIndex: number = 0,
  ): Promise<PostImage[]> {
    const images = urls.map((url, index) => {
      return this.imagesRepository.create({
        url,
        post,
        isThumbnail: index === thumbnailIndex,
      });
    });
    return await this.imagesRepository.save(images);
  }
}
