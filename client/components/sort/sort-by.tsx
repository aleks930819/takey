'use client';

import { useUpdateUrlSearchParams } from '@/hooks';
import { useSearchParams } from 'next/navigation';

const options = [
  { value: 'avgPrice', label: 'Avg. Price' },
  { value: 'createdAt', label: 'Newest' },
  { value: '-ratingsAverage', label: 'Reviews' },
  { value: '-createdAt', label: 'Oldest' },
];

const SortBy = () => {
  const { updateURL } = useUpdateUrlSearchParams();

  const choosedSort = useSearchParams().get('sort');

  console.log(choosedSort);

  const onSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateURL({ param: 'sort', value: e.target.value });
  };

  return (
    <select onChange={onSelectionChange} className="rounded-md border-2 border-gray-300 p-2" aria-label="Sort by">
      {options.map((option) => (
        <option key={option.value} value={option.value} selected={choosedSort === option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SortBy;
