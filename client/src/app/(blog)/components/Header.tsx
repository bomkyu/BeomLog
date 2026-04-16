import Typography from '@/app/component/Typography';

const Header = () => {
  return (
    <div className='fixed w-full h-[64px] px-20 top-0 border-b-1 border-[#E2E8F0] bg-white z-50'>
      <div className='w-full h-full'>
        <Typography variant='h3' className='flex h-full items-center'>
          Beom&apos;sLog
        </Typography>
      </div>
    </div>
  );
};
export default Header;
