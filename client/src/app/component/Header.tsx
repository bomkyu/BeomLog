import Typography from './Typography';

const Header = () => {
  return (
    <div className='fixed w-full h-[64px] px-16 border-b-1 border-[#E2E8F0] bg-white'>
      <div className='w-full h-full px-6'>
        <Typography variant='h3' className='flex h-full items-center'>
          Beom&apos;s portfolio
        </Typography>

        <ul className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <li className='flex gap-8'>
            <a href='#introduce'>
              <Typography variant='body'>소개</Typography>
            </a>
            <a href='#stack'>
              <Typography variant='body'>기술 스택</Typography>
            </a>
            <a href='#project'>
              <Typography variant='body'>프로젝트</Typography>
            </a>
            <a href='#phone'>
              <Typography variant='body'>연락처</Typography>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
