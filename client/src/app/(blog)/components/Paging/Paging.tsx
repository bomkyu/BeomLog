import Typography from '@/app/component/Typography';

type PagingProps = {
  num: string;
};
const Paging = ({ num }: PagingProps) => {
  return (
    <div className='flex items-center justify-center w-10 h-10 border border-[#E2E8F0] rounded-lg bg-white'>
      <Typography className='bold'>{num}</Typography>
    </div>
  );
};
export default Paging;
