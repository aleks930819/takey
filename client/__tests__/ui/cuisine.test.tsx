import { render, screen } from '@testing-library/react';

import CuisinesSlider from '@/components/cuisines/cuisines-slider';

import { mockCuisines } from '../__mocks__/msw/mock-data';

it('should render the the cusine carousel', () => {
  render(<CuisinesSlider cuisines={mockCuisines} />);

  expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
});
