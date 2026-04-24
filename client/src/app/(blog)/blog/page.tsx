import Typography from '@/app/component/Typography';
import Paging from '../components/Paging/Paging';
import { getCategoriesFromApi, getPostsFromApi } from '@/app/lib/api';
import FilterChipLayout from '../components/FilterChip/FilterChipLayout';
import CardLayout from '../components/Card/CardLayout';
import PagingLayout from '../components/Paging/PagingLayout';

export interface Category {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  summary: string;
  content: string;
  thumbnail: string;
  views: number;
  createdAt: string;
  category: Category;
  tags: Tag[];
}

const Blog = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) => {
  const { page = '1', category = 'all' } = await searchParams;

  const [data, categories] = await Promise.all([
    getPostsFromApi(page, category),
    getCategoriesFromApi(),
  ]);

  return (
    <div className='mt-16'>
      <div className='flex flex-col gap-4 pt-10 mb-12'>
        <Typography variant='h1'>기술 블로그</Typography>
        <Typography className=''>
          프론트엔드 개발 여정과 일상 속의 기술적인 고민들을 공유합니다.
          최신트렌드부터
          <br />
          깊이 있는 아키텍처 이야기까지 만나보세요.
        </Typography>
      </div>
      <FilterChipLayout categories={categories} />

      <CardLayout data={data.posts} />

      <PagingLayout totalPages={data.totalPages} currentPage={Number(page)} />
    </div>
  );
};
export default Blog;
