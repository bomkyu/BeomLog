'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterChip from './FilterChip';

type FilterChipLayout = {
  categories: { id: number; name: string }[];
};
const FilterChipLayout = ({ categories }: FilterChipLayout) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const handleClick = (id: number | string) => {
    router.push(`/blog?category=${id}`);
  };

  return (
    <div className='flex my-10 gap-2 '>
      <FilterChip
        categoryId='all'
        isActive={currentCategory === 'all'}
        onClick={() => handleClick('all')}
      >
        전체
      </FilterChip>
      {categories.map((category) => (
        <FilterChip
          key={category.id}
          categoryId={category.id}
          isActive={currentCategory === String(category.id)}
          onClick={() => handleClick(category.id)}
        >
          {category.name}
        </FilterChip>
      ))}
    </div>
  );
};

export default FilterChipLayout;
