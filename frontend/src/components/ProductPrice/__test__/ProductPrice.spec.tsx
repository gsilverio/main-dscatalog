import { render, screen } from '@testing-library/react';
import ProductPrice from '..';

test('should render ProductPrice', () => {
  const price = 4.2;
  render(<ProductPrice price={price} />);
  expect(screen.getByText('R$')).toBeInTheDocument();
  expect(screen.getByText('4,20')).toBeInTheDocument();
});
