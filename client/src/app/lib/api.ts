import 'server-only';

const BASE_URL = process.env.BACKEND_INTERNAL_URL;

/** * 게시글 목록 가져오기 (필터 및 페이징 적용) */
export const getPostsFromApi = async (
  page: string = '1',
  category: string = 'all'
) => {
  const url = new URL(`${BASE_URL}/posts`);
  url.searchParams.append('page', page);
  url.searchParams.append('category', category);

  try {
    const res = await fetch(url.toString(), {
      // 60초 동안 캐시 유지
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error('게시글 로드 실패');
    return res.json();
  } catch (error) {
    console.error('getPostsFromApi Error:', error);
    return { posts: [], totalPages: 0 };
  }
};

/** * 카테고리 목록 가져오기 */
export const getCategoriesFromApi = async () => {
  try {
    const res = await fetch(`${BASE_URL}/categories`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('카테고리 로드 실패');
    return res.json();
  } catch (error) {
    console.error('getCategoriesFromApi Error:', error);
    return [];
  }
};
