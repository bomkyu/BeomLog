import Typography from '@/app/component/Typography';

type PagingProps = {
  num: number;
  isActive: boolean;
  onclick: () => void;
};
const Paging = ({ num, isActive, onclick }: PagingProps) => {
  const buttonStyle = isActive
    ? 'bg-primary-blue border-primary-blue shadow-lg scale-110 text-white'
    : 'bg-white border-gray-200 hover:border-primary-blue hover:text-primary-blue';

  return (
    <button
      onClick={onclick}
      className={`flex items-center justify-center w-10 h-10 border rounded-lg transition-all duration-200 ${buttonStyle}`}
    >
      <Typography className='bold'>{num}</Typography>
    </button>
  );
};
export default Paging;
