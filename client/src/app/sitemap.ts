import { MetadataRoute } from 'next';
import { getPostsFromApi } from './lib/api';
import { Post } from './(blog)/blog/page';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const baseUrl = 'https://beomlog.dev';

  // 1. 블로그 포스트 데이터 가져오기
  let posts: Post[] = [];
  try {
    posts = await getPostsFromApi();
  } catch (error) {
    console.error('Sitemap fetch error:', error);
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
      url: baseUrl, // 포트폴리오 메인 (/)
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0, // 가장 중요한 페이지
    },
    {
      url: `${baseUrl}/blog`, // 블로그 목록 (/blog)
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9, // 블로그 메인도 높은 순위
    },
  ];

  return [...mainRoutes, ...postUrls];
};

export default sitemap;
