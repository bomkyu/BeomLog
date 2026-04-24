import Typography from '@/app/component/Typography';
import ImgThumb from '../ImgThumb';
import { Post } from '../../blog/page';
import { formattedDatefunc } from '@/app/lib/utils';
import { CalendarDays, Eye } from 'lucide-react';
import CardBadge from './CardBadge';

const Card = ({ title, summary, createdAt, views, category }: Post) => {
  return (
    <div className='bg-white rounded-xl overflow-hidden'>
      <div className='relative'>
        <div className='absolute w-full h-full left-0 top-0 inset-0 bg-linear-[to_bottom,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0)_100%] z-50' />
        <ImgThumb src='test' alt='test' />
      </div>
      <div className='flex flex-col gap-3 p-6 border-b-[#F1F5F9] '>
        <div>
          <CardBadge color='primary-blue' text={category.name} />
        </div>
        <Typography variant='h3'>{title}</Typography>
        <Typography variant='caption' className='text-sm'>
          {summary}
        </Typography>
        <div className='flex pt-4 justify-between border-t border-[#F1F5F9]'>
          <div className='flex gap-1'>
            <CalendarDays size={14} color='#94A3B8' />
            <Typography className='text-xs text-[#64748B]'>
              {formattedDatefunc(createdAt)}
            </Typography>
          </div>
          <div className='flex gap-1'>
            <Eye size={14} color='#94A3B8' />
            <Typography className='text-xs text-[#94A3B8]'>{views}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
