import Typography from '@/app/component/Typography';

const Footer = () => {
  return (
    <div className='flex relative flex-col w-full h-[117px] justify-center items-start gap-2 px-20 bg-white items-center'>
      <Typography className='font-bold text-primary-blue'>
        Beom&apos;sLog
      </Typography>
      <Typography className='text-sm text-[#94A3B8]'>
        © 2025 BeomKyu Seo. All rights reserved.
      </Typography>
    </div>
  );
};
export default Footer;
