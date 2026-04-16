import Typography from '@/app/component/Typography';
import FilterChip from '../components/FilterChip/FilterChip';
import Card from '../components/Card/Card';
import Paging from '../components/Paging/Paging';

const Blog = () => {
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
      <div className='flex my-10 gap-2 '>
        <FilterChip />
        <FilterChip />
        <FilterChip />
      </div>
      <div className='grid grid-cols-3 gap-6'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className='flex justify-center gap-2 mt-16 mb-20'>
        <Paging num='1' />
        <Paging num='2' />
        <Paging num='3' />
        <Paging num='4' />
        <Paging num='5' />
      </div>
    </div>
  );
};
export default Blog;
