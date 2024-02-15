import { render, screen } from '@testing-library/react';

import { RestaruantCard } from '@/components/restaruant';

import { mockRestaraunts } from '../__mocks__/msw/mock-data';

it('should render the restaruant card in the correct way', () => {
  render(<RestaruantCard restaurant={mockRestaraunts[0]} />);

  expect(screen.getByRole('heading', { name: mockRestaraunts[0].name })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: mockRestaraunts[0].name })).toBeInTheDocument();
  expect(screen.getByTestId('min-order')).toHaveTextContent(
    `Min. Order: $${mockRestaraunts[0].minOrderPrice.toFixed(2)}`,
  );

  expect(screen.getByTestId('restaurant-card')).toHaveAttribute('href', `/restaurants/${mockRestaraunts[0]._id}`);

  expect(screen.getByTestId('delivery-time')).toHaveTextContent(
    `Min. Delivery Time: ${mockRestaraunts[0].deliveryTime} min.`,
  );
  expect(screen.getByTestId('rating')).toHaveTextContent(
    `${mockRestaraunts[0].ratingsAverage}(${mockRestaraunts[0].ratingsQuantity}) Reviews`,
  );
  expect(screen.getByText(`Open`)).toBeInTheDocument();
});
