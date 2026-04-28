import { Category } from 'src/categories/entities/category.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { PostImage } from 'src/images/entities/image.entity';

import { Tag } from 'src/tags/entities/tags.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  summary: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Category, (category) => category.posts, { nullable: true })
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({ name: 'post_tags' }) // 조인 생성
  tags: Tag[];

  @OneToMany(() => Comment, (comment: Comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => PostImage, (PostImage) => PostImage.post)
  images: PostImage[];
}
