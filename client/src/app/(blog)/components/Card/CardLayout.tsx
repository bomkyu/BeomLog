import Link from 'next/link';
import { Post } from '../../blog/page';
import Card, { CardSkeleton } from './Card';
import Nodata from '../Nodata';

const CardLayout = ({ data }: { data: Post[] }) => {
  return (
    <div className='w-full min-h-[560px]'>
      {data.length === 0 ? (
        <Nodata />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {data.map((item) => (
            <Link key={item.id} href={`/blog/${item.id}`}>
              <Card {...item} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export const CardLayoutSkeleton = () => {
  return (
    <div className='w-full min-h-[560px]'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {Array.from({ length: 6 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default CardLayout;
