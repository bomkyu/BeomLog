import { Post } from 'src/posts/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column({ select: false }) // 보안상 조회할 때 비번은 기본적으로 안 나오게 설정
  password: string;

  @Column({ type: 'text' })
  content: string;

  // 관계 설정: 댓글(Many)은 하나의 게시글(One)에 달린다.
  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Post;

  @CreateDateColumn()
  createdAt: Date;
}
