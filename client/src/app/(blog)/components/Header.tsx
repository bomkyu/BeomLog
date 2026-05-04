import Typography from '@/app/component/Typography';
import Link from 'next/link';

const Header = () => {
  return (
    <div className='fixed w-full h-[64px] px-20 top-0 border-b-1 border-[#E2E8F0] bg-white z-50'>
      <div className='w-full h-full'>
        <Link href={'/blog'}>
          <Typography variant='h3' className='flex h-full items-center'>
            Beom&apos;sLog
          </Typography>
        </Link>
      </div>
    </div>
  );
};
export default Header;
