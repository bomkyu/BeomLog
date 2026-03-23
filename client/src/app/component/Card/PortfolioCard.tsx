import Link from 'next/link';
import Typography from '../Typography';
import Badge from '../Badge';

const PortfolioCard = () => {
  return (
    <div className='max-w-[534px] w-full border border-stroke-gray bg-white rounded-2xl'>
      <Link href={'/'}>
        <div></div>
        <div className='p-6'>
          <div className='mb-4 self-start'>
            <Badge color='primary-blue'>React</Badge>
          </div>
          <div className='flex flex-col gap-4'>
            <Typography variant='h3'>차세대 커머스 대시보드</Typography>
            <Typography>
              실시간 주문 트래킹과 데이터 시각화를 제공하는 B2B 관리자 대시
              보드를 구축했습니다. 전반적인 성능을 40% 개선했습니다.
            </Typography>
            <div className='flex gap-2'>
              <Typography as='span'>상세보기</Typography>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default PortfolioCard;
