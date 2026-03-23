import Typography from './Typography';

const Footer = () => {
  return (
    <div className='relative flex flex w-full h-[117px] px-16 bg-white items-center'>
      <Typography className='text-sm font-bold'>
        Beom&apos;s portfolio
      </Typography>
      <Typography className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-[#94A3B8]'>
        © 2025 BeomKyu Seo. All rights reserved.
      </Typography>
    </div>
  );
};
export default Footer;
