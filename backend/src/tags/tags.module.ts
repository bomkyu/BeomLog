import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { TagsService } from './tag.service';

@Module({
  imports: [
    // Tag 엔티티를 이 모듈 내 Repository로 쓸 수 있게 등록
    TypeOrmModule.forFeature([Tag]),
  ],
  providers: [TagsService],
  // 다른 모듈(PostsModule)에서 TagsService를 쓸 수 있게 내보냅니다.
  exports: [TagsService],
})
export class TagsModule {}
