import Link from 'next/link';
import Buttons from './component/Buttons';
import Typography from './component/Typography';

const NotFound = () => {
  return (
    <div className='relative flex flex-col gap-6 items-center justify-center min-h-screen bg-slate-50'>
      <div className='flex flex-col gap-8 '>
        <Typography className='text-6xl text-center'>
          요청하신 페이지를 찾을 수<br />
          없습니다.
        </Typography>
        <Typography className='text-lg text-center'>
          주소가 올바른지 확인해 주세요. <br />
          찾으시는 페이지가 이 동했거나 삭제되었을수 있습니다.
        </Typography>
        <Typography className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] text-primary-blue/20 font-extrabold'>
          404
        </Typography>
      </div>
      <div className='relative z-10 pt-4'>
        <Link href={'/'}>
          <Buttons btnType={'primary'}>홈으로 돌아가기</Buttons>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
