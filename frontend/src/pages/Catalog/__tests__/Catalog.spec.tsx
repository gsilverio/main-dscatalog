/* eslint-disable testing-library/no-debugging-utils */
import { render, screen, waitFor } from '@testing-library/react';
import Catalog from '../';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { myHistory } from 'util/history';

test('should render Catalog with products', async () => {
  render(
    <HistoryRouter history={myHistory}>
      <Catalog />
    </HistoryRouter>
  );

  screen.debug();

  expect(screen.getByText('Catalogo de produtos')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Smart TV')).toBeInTheDocument();
  });
});
