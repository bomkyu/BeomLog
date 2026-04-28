import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('images')
export class PostImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Post, (post) => post.images, { onDelete: 'CASCADE' })
  post: Post;

  @Column()
  postsId: number;

  @Column({ default: false })
  isThumbnail: boolean;
}
