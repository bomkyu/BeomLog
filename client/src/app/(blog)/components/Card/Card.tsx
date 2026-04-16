import Typography from '@/app/component/Typography';
import ImgThumb from '../ImgThumb';

const Card = () => {
  return (
    <div className='bg-white rounded-xl overflow-hidden'>
      <div className='relative'>
        <div className='absolute w-full h-full left-0 top-0 inset-0 bg-linear-[to_bottom,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0)_100%] z-50' />
        <ImgThumb src='test' alt='test' />
      </div>
      <div className='flex flex-col gap-3 p-6 border-b-[#F1F5F9] '>
        <Typography variant='h3'>개발자를 위한 다크모드 디자인 전략</Typography>
        <Typography variant='caption' className='text-sm'>
          RSC가 도입된 배경과 기존 SSR 방식과의 차이 점, 그리고 실제 프로덕션
          <br />
          환경에서의 성능 최적 화 사례를 상세히 파헤쳐 봅니다.
        </Typography>
        <div className='flex pt-4 justify-between border-t border-[#F1F5F9]'>
          <Typography className='text-xs text-[#64748B]'>2024.05.20</Typography>
          <div className=''>
            <Typography className='text-xs text-[#94A3B8]'>1.2k</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
