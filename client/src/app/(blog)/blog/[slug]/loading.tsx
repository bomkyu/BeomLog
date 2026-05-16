const BlogViewLoading = () => {
  return (
    <div
      aria-hidden='true'
      className='max-w-[1280px] w-full min-h-[720px] m-auto bg-white animate-pulse'
    >
      <div className='p-4'>
        <div className='relative w-full h-100 rounded-xl overflow-hidden bg-[#E2E8F0]'>
          <div className='absolute inset-0 bg-linear-[to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0)_100%]' />
          <div className='absolute flex flex-col gap-3 w-full bottom-0 left-0 p-10'>
            <div className='h-7 w-24 rounded-full bg-white/70' />
            <div className='h-11 w-full max-w-[680px] rounded-md bg-white/70' />
          </div>
        </div>
      </div>
      <div className='flex justify-between gap-6 p-10'>
        <div className='space-y-2'>
          <div className='h-6 w-20 rounded-md bg-[#E2E8F0]' />
          <div className='h-4 w-56 rounded-md bg-[#E2E8F0]' />
        </div>
        <div className='flex gap-2'>
          <div className='h-9 w-20 rounded-lg bg-[#F1F5F9]' />
          <div className='h-9 w-20 rounded-lg bg-[#F1F5F9]' />
        </div>
      </div>
      <section className='min-h-[360px] pt-8 px-10 border-t border-b border-[#F1F5F9]'>
        <div className='space-y-4'>
          <div className='h-7 w-2/3 rounded-md bg-[#E2E8F0]' />
          <div className='h-4 w-full rounded-md bg-[#E2E8F0]' />
          <div className='h-4 w-full rounded-md bg-[#E2E8F0]' />
          <div className='h-4 w-11/12 rounded-md bg-[#E2E8F0]' />
          <div className='h-4 w-full rounded-md bg-[#E2E8F0]' />
          <div className='h-4 w-4/5 rounded-md bg-[#E2E8F0]' />
        </div>
        <div className='flex gap-2 py-8'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className='h-8 w-20 rounded-full bg-[#F1F5F9]'
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogViewLoading;
