import { extractImagesFromContent } from './utils';

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
    next: { revalidate: 0 },
  });

  console.log(res);
  if (!res.ok) return null;
  return res.json();
};

/** write페이지 데이테 보내기 */
export const handleCreatePosts = async (
  formData: FormData,
  extraData: {
    content: string;
    images: { url: string; isThumbnail: boolean }[];
  }
) => {
  const plainTextContent = (formData.get('content') as string) || '';

  const contentImages = extractImagesFromContent(extraData.content);
  // 기존 썸네일(extraData.images)과 본문 이미지 합치기
  const combinedImages = [...extraData.images, ...contentImages];

  const postData = {
    title: formData.get('title') as string,
    summary: plainTextContent.replace(/<[^>]*>/g, '').substring(0, 150),
    content: extraData.content,
    images: combinedImages,
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
      credentials: 'include',
    });

    if (response.ok) {
      return true;
    } else {
      const errorData = await response.json();
      alert(`실패: ${errorData.message || '알 수 없는 에러'}`);
      return false;
    }
  } catch (error) {
    console.error('네트워크 에러:', error);
    alert('서버와 연결할 수 없습니다.');
    return false;
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
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || '이미지 업로드에 실패했습니다.');
  }

  return response.json();
};

/** 삭제 APi */
export const deletePostApi = async (postId: number) => {
  const res = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('게시글 삭제에 실패했습니다.');
  }

  return res.json();
};

/** 게시글 수정 API (JSON 방식) */
export const handleUpdatePost = async (
  postId: number,
  formData: FormData,
  additionalData: {
    content: string;
    images: { url: string; isThumbnail: boolean }[];
  }
) => {
  const contentImages = extractImagesFromContent(additionalData.content);

  // 1. URL 중복을 제거하면서 기존 추가 데이터
  const combinedImages = [
    ...additionalData.images, // 썸네일 정보가 포함된 기존 배열
    ...contentImages.filter(
      (cImg) => !additionalData.images.some((aImg) => aImg.url === cImg.url)
    ), // 기존 배열에 없는 URL만 새로 추가
  ];

  // 2. 혹시나 썸네일이 하나도 없다면 첫 번째 사진을 썸네일로 설정
  if (
    combinedImages.length > 0 &&
    !combinedImages.some((img) => img.isThumbnail)
  ) {
    combinedImages[0].isThumbnail = true;
  }

  const updateData = {
    title: formData.get('title'),
    categoryId: Number(formData.get('category')),
    tags:
      formData
        .get('tags')
        ?.toString()
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean) || [],
    content: additionalData.content,
    images: combinedImages,
  };

  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData), // 이제 이 안에 tags는 ["ada", "Ang"] 배열임
    credentials: 'include',
  });

  if (!response.ok) throw new Error('수정 실패 ㅠ');
  return true;
};
