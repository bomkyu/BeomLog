import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostImage } from './entities/image.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { promises as fs } from 'fs';
import { join } from 'path';

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

  async removeImageFile(url: string) {
    try {
      const fileName = url.split('/').pop();
      if (!fileName) return;

      const filePath = join(process.cwd(), 'uploads', fileName);

      await fs.access(filePath); // 파일 있는지 확인
      await fs.unlink(filePath); // 파일 삭제
      console.log(`파일 삭제 성공: ${filePath}`);
    } catch (error) {
      console.log('ERROR : ', error);
    }
  }
}
