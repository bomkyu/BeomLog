import FilterChip from './FilterChip';

type FilterChipLayout = {
  categories: { id: number; name: string }[];
};
const FilterChipLayout = ({ categories }: FilterChipLayout) => {
  return (
    <div className='flex my-10 gap-2 '>
      {categories.map((category) => (
        <FilterChip key={category.id}>{category.name}</FilterChip>
      ))}
    </div>
  );
};

export default FilterChipLayout;
