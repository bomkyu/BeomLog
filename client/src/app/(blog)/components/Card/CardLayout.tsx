import Link from 'next/link';
import { Post } from '../../blog/page';
import Card from './Card';

const CardLayout = ({ data }: { data: Post[] }) => {
  return (
    <div className='grid grid-cols-3 gap-6'>
      {data.map((data) => (
        <Link key={data.id} href={`blog/${data.id}`}>
          <Card {...data} />
        </Link>
      ))}
    </div>
  );
};

export default CardLayout;
