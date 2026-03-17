import { ReactNode } from 'react';
import Typography from '../Typography';

type AboutCardProps = {
  icon?: ReactNode;
  title: string;
  description: string;
};
const AboutCard = ({ icon, title, description }: AboutCardProps) => {
  return (
    <div className='p-6 bg-white border border-1 border-[#F1F5F9] rounded-xl '>
      <div className='mb-6'>{icon}</div>
      <div className='flex flex-col gap-2'>
        <Typography variant='h3'>{title}</Typography>
        <Typography variant='caption'>{description}</Typography>
      </div>
    </div>
  );
};
export default AboutCard;
