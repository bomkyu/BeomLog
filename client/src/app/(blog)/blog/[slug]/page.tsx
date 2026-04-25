import Badge from '@/app/component/Badge';
import Typography from '@/app/component/Typography';
import CustoMTextArea from '../../components/Comment/CustomTextArea';
import Buttons from '@/app/component/Buttons';
import { formattedDatefunc } from '@/app/lib/utils';
import { Tag } from '../page';
import Image from 'next/image';
import { getPost } from '@/app/lib/api';
import { Pencil } from 'lucide-react';
import DeleteBtnLayout from './components/DeleteBtnLayout';

const BlogViewPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className='p-20 text-center'>
        <Typography variant='h2'>존재하지 않는 게시글입니다. 🥲</Typography>
      </div>
    );
  }

  return (
    <div className='max-w-[1280px] w-full m-auto bg-white'>
      <div className='p-4'>
        <div className='flex relative w-full h-100 rounded-xl overflow-hidden'>
          <Image
            src={post.thumbnail}
            alt={`${post.title}이미지`}
            fill
            unoptimized
          />
          <div className='absolute flex flex-col gap-2 w-full bottom-0 left-0 p-10'>
            <Badge color={'blog'}>{post.category.name}</Badge>
            <Typography variant='h1' className='text-white'>
              {post.title}
            </Typography>
            <div className='absolute w-full h-full inset-0 bg-linear-[to_top,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0)_50%]' />
          </div>
        </div>
      </div>
      <div className='flex justify-between p-10'>
        <div>
          <Typography className='text-lg'>서범규</Typography>
          <Typography variant='caption'>
            Frontend Devloper &#183; {formattedDatefunc(post.createdAt)}
          </Typography>
        </div>
        <div className='flex gap-2'>
          <Buttons btnType='PostAction' className='bg-[#F1F5F9]'>
            <Pencil size={14} />
            <Typography className='text-sm'>수정</Typography>
          </Buttons>
          <DeleteBtnLayout id={post.id} />
        </div>
      </div>
      <section className='pt-8 px-10 border-t border-b border-[#F1F5F9]'>
        <div
          className='prose max-w-none'
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className='flex gap-2 py-8'>
          {post.tags.map((tag: Tag) => (
            <Badge key={tag.id} color='tag'>
              # {tag.name}
            </Badge>
          ))}
        </div>
      </section>
      <section className='p-10 bg-[#F8FAFC]'>
        <Typography variant='h3'>
          댓글 <span className='text-primary-blue'>3</span>
        </Typography>
        <div className='my-8'>
          <CustoMTextArea />
          <Buttons btnType={'primary'} className='ml-auto'>
            댓글 등록
          </Buttons>
        </div>
      </section>
    </div>
  );
};
export default BlogViewPage;
