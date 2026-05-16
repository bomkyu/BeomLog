import Typography from '@/app/component/Typography';
import ImgThumb from '../ImgThumb';
import { Post } from '../../blog/page';
import { formattedDatefunc } from '@/app/lib/utils';
import { CalendarDays, Eye } from 'lucide-react';
import CardBadge from './CardBadge';

const Card = ({ title, summary, createdAt, views, images, category }: Post) => {
  return (
    <div className='bg-white rounded-xl overflow-hidden'>
      <div className='relative'>
        <ImgThumb
          src={`${process.env.NEXT_PUBLIC_RESOURCE_URL + images[0].url}`}
          alt={`썸네일 이미지`}
        />
        <div className='absolute w-full h-full left-0 top-0 inset-0 bg-linear-[to_bottom,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0)_100%] z-50' />
      </div>
      <div className='flex flex-col min-h-60 h-full flex-1 gap-3 p-6  border-b-[#F1F5F9] '>
        <div>
          <CardBadge color='primary-blue' text={category.name} />
        </div>
        <Typography variant='h3' className='line-clamp-2'>
          {title}
        </Typography>
        <Typography variant='caption' className='text-sm line-clamp-3'>
          {summary}
        </Typography>
        <div className='flex pt-4 justify-between border-t border-[#F1F5F9] mt-auto'>
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

export const CardSkeleton = () => {
  return (
    <div
      aria-hidden='true'
      className='bg-white rounded-xl overflow-hidden animate-pulse'
    >
      <div className='relative overflow-hidden bg-[#E2E8F0]'>
        <div className='pt-[50%]' />
        <div className='absolute inset-0 bg-linear-[to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0)_100%]' />
      </div>
      <div className='flex flex-col min-h-60 h-full flex-1 gap-3 p-6 border-b-[#F1F5F9]'>
        <div className='h-6 w-20 rounded-full bg-[#E2E8F0]' />
        <div className='space-y-2'>
          <div className='h-6 w-full rounded-md bg-[#E2E8F0]' />
          <div className='h-6 w-2/3 rounded-md bg-[#E2E8F0]' />
        </div>
        <div className='space-y-2'>
          <div className='h-4 w-full rounded-md bg-[#E2E8F0]' />
          <div className='h-4 w-full rounded-md bg-[#E2E8F0]' />
          <div className='h-4 w-3/4 rounded-md bg-[#E2E8F0]' />
        </div>
        <div className='flex pt-4 justify-between border-t border-[#F1F5F9] mt-auto'>
          <div className='h-4 w-24 rounded-md bg-[#E2E8F0]' />
          <div className='h-4 w-10 rounded-md bg-[#E2E8F0]' />
        </div>
      </div>
    </div>
  );
};

export default Card;
