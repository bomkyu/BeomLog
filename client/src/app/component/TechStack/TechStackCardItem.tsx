import Image from 'next/image';
import { STACK_ICON_MAP } from '../icons';
import Typography from '../Typography';

type TechStackCardItemProps = {
  text: string;
  iconName: string;
};
const TechStackCardItem = ({ text, iconName }: TechStackCardItemProps) => {
  const iconData = STACK_ICON_MAP[iconName];

  return (
    <div className='flex flex-col h-auto p-4 gap-3 items-center border border-light-gray2 rounded-xl'>
      <div className='flex items-center justify-center w-12 h-12 rounded-full bg-[#EFF6FF]'>
        <Image
          src={iconData}
          alt={`${text} icon`}
          className='object-contain'
          priority={true}
        />
      </div>
      <Typography className='font-bold text-sm'>{text}</Typography>
    </div>
  );
};
export default TechStackCardItem;
