import { Post } from 'src/posts/entities/post.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('images')
export class PostImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  // 관계 정의와 실제 DB 컬럼명을 JoinColumn으로 묶어줌
  @ManyToOne(() => Post, (post) => post.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postsId' }) // DB의 postsId 컬럼을 이 관계의 외래키로 쓰겠다고 명시
  post: Post;

  @Column()
  postsId: number;

  @Column({ default: false })
  isThumbnail: boolean;
}
