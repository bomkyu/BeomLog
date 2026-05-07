import Link from 'next/link';
import { Post } from '../../blog/page';
import Card from './Card';
import Nodata from '../Nodata';

const CardLayout = ({ data }: { data: Post[] }) => {
  return (
    <div className='w-full'>
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

export default CardLayout;
