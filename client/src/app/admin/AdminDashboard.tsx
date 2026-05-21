'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  Edit3,
  Eye,
  LogOut,
  Plus,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import {
  deletePostApi,
  getPostsFromApi,
  loginAdminApi,
  logoutAdminApi,
} from '@/app/lib/api';
import Typography from '@/app/component/Typography';
import Buttons from '@/app/component/Buttons';
import { useAuthStore } from '@/store/useAuthStore';

type AdminPost = {
  id: number;
  title: string;
  summary: string;
  views: number;
  createdAt: string;
  category?: {
    id: number;
    name: string;
  };
};

type PostsResponse = {
  posts: AdminPost[];
  totalPages: number;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(value));

const AdminDashboard = () => {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const setIsAdmin = useAuthStore((state) => state.setIsAdmin);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsData, setPostsData] = useState<PostsResponse>({
    posts: [],
    totalPages: 0,
  });

  const totalViews = useMemo(
    () => postsData.posts.reduce((sum, post) => sum + post.views, 0),
    [postsData.posts]
  );

  const loadPosts = async (page = currentPage) => {
    setIsLoadingPosts(true);
    try {
      const data = await getPostsFromApi(String(page), 'all');
      setPostsData(data);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) return;

    void Promise.resolve().then(() => loadPosts(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, currentPage]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await loginAdminApi(username, password);
      setIsAdmin(true);
      setPassword('');
      setCurrentPage(1);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : '로그인에 실패했습니다.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdminApi();
    setIsAdmin(false);
    setPostsData({ posts: [], totalPages: 0 });
  };

  const handleDelete = async (postId: number) => {
    const shouldDelete = window.confirm('이 게시글을 삭제할까요?');
    if (!shouldDelete) return;

    await deletePostApi(postId);
    await loadPosts(currentPage);
  };

  if (!isAdmin) {
    return (
      <main className='min-h-screen bg-[#F8FAFC] px-5 py-16'>
        <section className='mx-auto flex min-h-[calc(100vh-128px)] w-full max-w-[420px] items-center'>
          <form
            onSubmit={handleLogin}
            className='w-full rounded-lg border border-[#E2E8F0] bg-white p-8 shadow-sm'
          >
            <div className='mb-8'>
              <Typography variant='h2'>관리자 로그인</Typography>
              <Typography variant='caption' className='mt-2 block'>
                BeomLog 콘텐츠 관리를 시작합니다.
              </Typography>
            </div>

            <label className='mb-5 block'>
              <span className='mb-2 block text-sm font-semibold text-[#334155]'>
                아이디
              </span>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className='h-11 w-full rounded-lg border border-[#CBD5E1] px-4 outline-none transition focus:border-primary-blue'
                autoComplete='username'
              />
            </label>

            <label className='mb-6 block'>
              <span className='mb-2 block text-sm font-semibold text-[#334155]'>
                비밀번호
              </span>
              <input
                type='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className='h-11 w-full rounded-lg border border-[#CBD5E1] px-4 outline-none transition focus:border-primary-blue'
                autoComplete='current-password'
              />
            </label>

            {errorMessage && (
              <p className='mb-4 rounded-md bg-[#FEF2F2] px-4 py-3 text-sm text-[#B91C1C]'>
                {errorMessage}
              </p>
            )}

            <Buttons
              type='submit'
              btnType='primary'
              className='h-11 w-full'
              disabled={isSubmitting}
            >
              {isSubmitting ? '확인 중...' : '로그인'}
            </Buttons>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-[#F8FAFC] px-5 py-8'>
      <div className='mx-auto w-full max-w-[1120px]'>
        <header className='mb-8 flex flex-col gap-4 border-b border-[#E2E8F0] pb-6 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <Typography variant='h1' className='text-4xl'>
              관리자 페이지
            </Typography>
            <Typography variant='caption' className='mt-2 block'>
              게시글 작성, 수정, 삭제와 조회 현황을 관리합니다.
            </Typography>
          </div>
          <div className='flex flex-wrap gap-2'>
            <Link href='/blog/write'>
              <Buttons btnType='primary' className='h-10 gap-2'>
                <Plus size={16} />
                글쓰기
              </Buttons>
            </Link>
            <Buttons
              btnType='outLine'
              className='h-10 gap-2 bg-white'
              onClick={() => loadPosts(currentPage)}
            >
              <RefreshCw size={16} />
              새로고침
            </Buttons>
            <Buttons
              btnType='outLine'
              className='h-10 gap-2 bg-white'
              onClick={handleLogout}
            >
              <LogOut size={16} />
              로그아웃
            </Buttons>
          </div>
        </header>

        <section className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3'>
          <div className='rounded-lg border border-[#E2E8F0] bg-white p-5'>
            <Typography variant='caption'>현재 페이지 글</Typography>
            <p className='mt-2 text-3xl font-bold text-[#0F172A]'>
              {postsData.posts.length}
            </p>
          </div>
          <div className='rounded-lg border border-[#E2E8F0] bg-white p-5'>
            <Typography variant='caption'>현재 페이지 조회수</Typography>
            <p className='mt-2 flex items-center gap-2 text-3xl font-bold text-[#0F172A]'>
              <BarChart3 size={24} />
              {totalViews}
            </p>
          </div>
          <div className='rounded-lg border border-[#E2E8F0] bg-white p-5'>
            <Typography variant='caption'>페이지</Typography>
            <p className='mt-2 text-3xl font-bold text-[#0F172A]'>
              {currentPage} / {Math.max(postsData.totalPages, 1)}
            </p>
          </div>
        </section>

        <section className='overflow-hidden rounded-lg border border-[#E2E8F0] bg-white'>
          <div className='grid grid-cols-[1fr_120px_120px_156px] gap-4 border-b border-[#E2E8F0] bg-[#F8FAFC] px-5 py-3 text-sm font-semibold text-[#475569] max-md:hidden'>
            <span>제목</span>
            <span>조회수</span>
            <span>작성일</span>
            <span className='text-right'>관리</span>
          </div>

          {isLoadingPosts ? (
            <div className='px-5 py-12 text-center text-sm text-[#64748B]'>
              불러오는 중...
            </div>
          ) : postsData.posts.length === 0 ? (
            <div className='px-5 py-12 text-center text-sm text-[#64748B]'>
              등록된 게시글이 없습니다.
            </div>
          ) : (
            postsData.posts.map((post) => (
              <article
                key={post.id}
                className='grid grid-cols-[1fr_120px_120px_156px] items-center gap-4 border-b border-[#F1F5F9] px-5 py-4 last:border-b-0 max-md:grid-cols-1'
              >
                <div className='min-w-0'>
                  <div className='mb-2 flex items-center gap-2'>
                    {post.category?.name && (
                      <span className='rounded-full bg-[#E0F2FE] px-2.5 py-1 text-xs font-semibold text-[#0369A1]'>
                        {post.category.name}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className='block truncate text-base font-semibold text-[#0F172A] hover:text-primary-blue'
                  >
                    {post.title}
                  </Link>
                  <p className='mt-1 line-clamp-1 text-sm text-[#64748B]'>
                    {post.summary}
                  </p>
                </div>
                <div className='flex items-center gap-1 text-sm text-[#475569]'>
                  <Eye size={15} />
                  {post.views}
                </div>
                <div className='text-sm text-[#64748B]'>
                  {formatDate(post.createdAt)}
                </div>
                <div className='flex justify-end gap-2 max-md:justify-start'>
                  <Link href={`/blog/edit/${post.id}`}>
                    <Buttons btnType='postAction' className='bg-[#F1F5F9]'>
                      <Edit3 size={14} />
                      수정
                    </Buttons>
                  </Link>
                  <Buttons
                    btnType='postAction'
                    className='bg-[#FEF2F2] text-[#B91C1C]'
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 size={14} />
                    삭제
                  </Buttons>
                </div>
              </article>
            ))
          )}
        </section>

        <div className='mt-6 flex justify-center gap-2'>
          <Buttons
            btnType='outLine'
            className='h-10 bg-white'
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
          >
            이전
          </Buttons>
          <Buttons
            btnType='outLine'
            className='h-10 bg-white'
            disabled={currentPage >= postsData.totalPages}
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(page + 1, Math.max(postsData.totalPages, 1))
              )
            }
          >
            다음
          </Buttons>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
