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
