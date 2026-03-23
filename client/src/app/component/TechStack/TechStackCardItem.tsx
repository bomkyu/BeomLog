import Typography from '../Typography';

type TechStackCardItemProps = {
  text: string;
};
const TechStackCardItem = ({ text }: TechStackCardItemProps) => {
  return (
    <div className='flex flex-col h-auto p-4 gap-3 items-center border border-light-gray2 rounded-xl'>
      <div className='w-12 h-12 rounded-full bg-[#EFF6FF]'></div>
      <Typography className='font-bold text-sm'>{text}</Typography>
    </div>
  );
};
export default TechStackCardItem;
