import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostImage } from './entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostImage])],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService, TypeOrmModule],
})
export class ImagesModule {}
