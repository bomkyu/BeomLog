import { CardLayoutSkeleton } from '../components/Card/CardLayout';

const BlogLoading = () => {
  return (
    <div className='mt-16'>
      <div className='flex flex-col gap-4 pt-10 mb-12 animate-pulse'>
        <div className='h-10 w-48 rounded-md bg-[#E2E8F0]' />
        <div className='space-y-2'>
          <div className='h-5 w-full max-w-[560px] rounded-md bg-[#E2E8F0]' />
          <div className='h-5 w-full max-w-[420px] rounded-md bg-[#E2E8F0]' />
        </div>
      </div>
      <div className='mb-8 flex flex-wrap gap-2 animate-pulse'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className='h-9 w-20 rounded-full bg-[#E2E8F0]' />
        ))}
      </div>
      <CardLayoutSkeleton />
      <div className='mt-16 mb-20 flex justify-center gap-2 animate-pulse'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className='h-9 w-9 rounded-md bg-[#E2E8F0]' />
        ))}
      </div>
    </div>
  );
};

export default BlogLoading;
