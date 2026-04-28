import { getPost } from '@/app/lib/api';
import PostForm from '../../../components/PostForm/PostForm';

type EditPageProps = {
  params: { id: string };
};

const EditPage = async ({ params }: EditPageProps) => {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return (
      <div className='flex justify-center items-center h-screen'>
        게시글을 찾을 수 없습니다. ㅠ
      </div>
    );
  }

  return (
    <div className='max-w-[1280px] m-auto p-10'>
      <PostForm initialData={post} />
    </div>
  );
};

export default EditPage;
