import Image from 'next/image';
import Link from 'next/link';

import { Cuisine } from '@/interfaces/cuisines';
import { getAllCuisines } from '@/actions/cuisine';
import CuisinesSlider from './cuisines-slider';

const Cuisines = async () => {
  const { data } = await getAllCuisines();

  return (
    <div>
      <CuisinesSlider cuisines={data.cuisines} />
    </div>
  );
};

export default Cuisines;
