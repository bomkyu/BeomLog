export const BASE_URL =
  typeof window === 'undefined'
    ? process.env.BACKEND_INTERNAL_URL
    : process.env.NEXT_PUBLIC_BACKEND_URL;

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
      next: { revalidate: 0 },
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
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error('카테고리 로드 실패');
    return res.json();
  } catch (error) {
    console.error('getCategoriesFromApi Error:', error);
    return [];
  }
};

/** view페이지 데이터 가져오기 */
export const getPost = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/posts/${slug}`, {
    next: { revalidate: 60 },
  });

  console.log(res);
  if (!res.ok) return null;
  return res.json();
};

/** write페이지 데이테 보내기 */
export const handleCreatePosts = async (
  formData: FormData,
  extraData: { content: string; thumbnail: string }
) => {
  const plainTextContent = (formData.get('content') as string) || '';

  const postData = {
    title: formData.get('title') as string,
    summary: plainTextContent.replace(/<[^>]*>/g, '').substring(0, 150),
    content: extraData.content,
    thumbnail: extraData.thumbnail,
    categoryId: Number(formData.get('category')),
    tags:
      formData
        .get('tags')
        ?.toString()
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean) || [],
  };

  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      // const result = await response.json();
      // console.log('DB 저장 성공:', result);
      // alert('게시글이 성공적으로 등록되었습니다! 🚀');
      return true;
    } else {
      const errorData = await response.json();
      // console.error('저장 실패:', errorData);
      alert(`실패: ${errorData.message || '알 수 없는 에러'}`);
    }
  } catch (error) {
    console.error('네트워크 에러:', error);
    alert('서버와 연결할 수 없습니다.');
  }
};

export type UploadResponse = {
  url: string;
};

export const uploadImageApi = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${BASE_URL}/posts/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || '이미지 업로드에 실패했습니다.');
  }

  return response.json();
};
