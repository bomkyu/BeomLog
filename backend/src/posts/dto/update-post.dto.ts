import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

/*
CreatePostDto의 모든 검증 규칙(IsString 등)을 그대로 가져오되,
모든 필드를 선택 사항으로 변경.
*/

export class UpdatePostDto extends PartialType(CreatePostDto) {}
