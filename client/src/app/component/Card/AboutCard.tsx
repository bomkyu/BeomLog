import Typography from '../Typography';
import Image from 'next/image';
import { MAIN_ICON_MAP } from '../icons';

type AboutCardProps = {
  icon: keyof typeof MAIN_ICON_MAP;
  title: string;
  description: string;
};
const AboutCard = ({ icon, title, description }: AboutCardProps) => {
  return (
    <div className='p-6 bg-white border border-[#F1F5F9] rounded-xl '>
      <div className='mb-6'>
        <Image
          src={MAIN_ICON_MAP[icon]}
          alt={`${title} icon`}
          priority={true}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Typography variant='h3'>{title}</Typography>
        <Typography variant='caption'>{description}</Typography>
      </div>
    </div>
  );
};
export default AboutCard;
