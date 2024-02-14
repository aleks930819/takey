import { URLParamRadioGroup } from '../common';
import ClearFiltersButton from './clear-filters-button';
import IsOpenSwitcher from './is-open-switcher';
import { RatingGrid } from './rating';

const deliveryTimeFilterOptions = [
  { label: '20 min. or less', value: '20' },
  { label: '30 min. or less', value: '30' },
];
const minOrderPriceFilterOptions = [
  { label: '$15 or less', value: '15' },
  { label: '$25 or less', value: '25' },
];

const Filter = () => {
  return (
    <div>
      <div className="flex flex-col items-start gap-4 px-4 py-4 lg:px-0 lg:py-6">
        <IsOpenSwitcher />
        <div className="h-[1.5px] w-full bg-gray-300" />
        <p className="text-lg font-bold lg:text-2xl">Rating</p>
        <RatingGrid />
        <div className="h-[1.5px] w-full bg-gray-300" />
        <URLParamRadioGroup options={deliveryTimeFilterOptions} paramName="deliveryTime" legend="Delivery Time" />
        <div className="h-[1.5px] w-full bg-gray-300" />
        <URLParamRadioGroup options={minOrderPriceFilterOptions} paramName="minOrderPrice" legend="Min. Order Price" />
        <div className="h-[1.5px] w-full bg-gray-300" />
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default Filter;
