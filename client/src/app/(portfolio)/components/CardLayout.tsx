import { Post } from '@/app/(blog)/blog/page';
import PortfolioCard from '@/app/component/Card/PortfolioCard';
import { getPostsFromApi } from '@/app/lib/api';

const CardLayout = async () => {
  const data = await getPostsFromApi('1', '3');
  const portfolios = data?.posts || [];
  return (
    <>
      {portfolios.map((item: Post) => (
        <PortfolioCard
          img={item.images[0].url}
          title={item.title}
          category={item.category.name}
          description={item.summary}
          src={`blog/${item.id}`}
          key={item.id}
        />
      ))}
    </>
  );
};
export default CardLayout;
