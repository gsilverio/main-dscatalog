import { render, screen, waitFor } from '@testing-library/react';
import Form from '../Form';
import {
  unstable_HistoryRouter as HistoryRouter,
  useParams,
} from 'react-router-dom';
import { myHistory } from '../../../../util/history';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import { server } from './fixtures';
import { act } from 'react-dom/test-utils';
import { ToastContainer } from 'react-toastify';

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Product form create tests', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({
      productId: 'create',
    });
  });

  test('should render form', async () => {
    render(
      <HistoryRouter history={myHistory}>
        <ToastContainer />
        <Form />
      </HistoryRouter>
    );

    // eslint-disable-next-line testing-library/no-debugging-utils
    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');
    const categoriesInput = screen.getByLabelText('Categorias');
    const submitButton = screen.getByRole('button', { name: /salvar/i });

    await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
    userEvent.type(nameInput, 'Computador');
    userEvent.type(priceInput, '5000.12');
    userEvent.type(
      imgUrlInput,
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHIx_4e1S6rInTaGdJs7_bSBXIH1FcdTFGug&usqp=CAU'
    );

    userEvent.type(descriptionInput, 'Computador brabissimo');
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(submitButton);
    });
    /*
    await waitFor(() => {
      const toastElement = screen.getByText('Cadastrado');
      expect(toastElement).toBeInTheDocument();
    });
    expect(myHistory.location.pathname).toEqual('/admin/products');*/
  });
  test('should show 5 validation messages when just clicking submit', async () => {
    render(
      <HistoryRouter history={myHistory}>
        <Form />
      </HistoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: /salvar/i });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(submitButton);
    });

    await waitFor(() => {
      const messages = screen.getAllByText('Campo Obrigatorio');
      expect(messages).toHaveLength(5);
    });
  });
});
