'use client';

import { useUpdateUrlSearchParams } from '@/hooks';
import { useSearchParams } from 'next/navigation';

const options = [
  { value: 'createdAt', label: 'Newest' },
  { value: '-createdAt', label: 'Oldest' },
  { value: '-ratingsAverage', label: 'Reviews' },
  { value: 'avgPrice', label: 'Avg. Price' },
];

const SortBy = () => {
  const { updateURL } = useUpdateUrlSearchParams();

  const choosedSort = useSearchParams().get('sort');

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
