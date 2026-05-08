import { MetadataRoute } from 'next';
import { getPostsFromApi } from './lib/api';
import { Post } from './(blog)/blog/page';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const baseUrl = 'https://beomlog.dev';

  // 1. 블로그 포스트 데이터 가져오기
  let posts: Post[] = [];

  try {
    const response = await getPostsFromApi();
    posts = Array.isArray(response) ? response : [];
  } catch (error) {
    console.error('Sitemap fetch error:', error);
    posts = [];
  }

  // 2. 블로그 상세 포스트들 (/blog/1, /blog/2 ...)
  const postUrls = posts.map((post: Post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7, // 상세 글은 중간 순위
  }));

  // 3. 주요 페이지들 (포트폴리오, 블로그 메인)
  const mainRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  return [...mainRoutes, ...postUrls];
};

export default sitemap;
