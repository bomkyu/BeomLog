const handleCreatePosts = async (formData: FormData) => {
  const plainTextContent = (formData.get('content') as string) || '';
  const postData = {
    title: formData.get('title') as string,
    summary: plainTextContent.replace(/<[^>]*>/g, '').substring(0, 150),
    content: formData.get('content') as string,
    thumbnail: (formData.get('thumbnail') as string) || '',
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
    const response = await fetch('http://localhost:4000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('DB 저장 성공:', result);
      alert('게시글이 성공적으로 등록되었습니다! 🚀');
    } else {
      const errorData = await response.json();
      console.error('저장 실패:', errorData);
      alert(`실패: ${errorData.message || '알 수 없는 에러'}`);
    }
  } catch (error) {
    console.error('네트워크 에러:', error);
    alert(
      '서버와 연결할 수 없습니다. 백엔드(4000번)가 켜져 있는지 확인하세요!'
    );
  }
};

export default handleCreatePosts;
