import { URLParamRadioGroup } from '../common';
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
        <p className="text-lg font-bold lg:text-2xl">Rating</p>
        <RatingGrid />
        <URLParamRadioGroup options={deliveryTimeFilterOptions} paramName="deliveryTime" legend="Delivery Time" />
        <URLParamRadioGroup options={minOrderPriceFilterOptions} paramName="minOrderPrice" legend="Min. Order Price" />
      </div>
    </div>
  );
};

export default Filter;
