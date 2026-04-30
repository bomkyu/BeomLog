export const formattedDatefunc = (datetime: Date | string) => {
  const date = new Date(datetime);
  return date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
    .replace(/\s/g, '')
    .replace(/\.$/, '');
};

type TagItem = { id?: number; name?: string; label?: string };

export const formatTagsToString = (
  tags: TagItem[] | TagItem | undefined | null
) => {
  if (!tags) return '';

  // 1. 배열인 경우 (객체 배열 [{name:'A'}] or 문자열 배열 ['A'])
  if (Array.isArray(tags)) {
    return tags
      .map((t) => {
        if (typeof t === 'object' && t !== null) {
          return t.name || t.label || '';
        }
        return String(t); // 문자열이면 그대로 반환
      })
      .filter(Boolean) // 빈 문자열이나 null이 섞이면 제거
      .join(', ');
  }
};

// HTML 본문에서 이미지 URL을 추출하여 객체 배열로 반환
export const extractImagesFromContent = (
  content: string
): { url: string; isThumbnail: boolean }[] => {
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  const images: { url: string; isThumbnail: boolean }[] = [];
  let match;

  while ((match = imgRegex.exec(content)) !== null) {
    images.push({
      url: match[1],
      isThumbnail: false, // 본문 이미지는 기본적으로 false
    });
  }

  return images;
};
