/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor } from '@testing-library/react';
import Form from '../Form';
import {
  unstable_HistoryRouter as HistoryRouter,
  useParams,
} from 'react-router-dom';
import { myHistory } from '../../../../util/history';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import { productResponse, server } from './fixtures';
import { act } from 'react-dom/test-utils';
import { ToastContainer } from 'react-toastify';
import exp from 'constants';

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

    userEvent.click(submitButton);

    /*await waitFor(() => {
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

  test('should clear validation messages when filling out the form correctly', async () => {
    render(
      <HistoryRouter history={myHistory}>
        <Form />
      </HistoryRouter>
    );
    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');
    const categoriesInput = screen.getByLabelText('Categorias');
    const submitButton = screen.getByRole('button', { name: /salvar/i });

    userEvent.click(submitButton);

    await waitFor(() => {
      const messages = screen.getAllByText('Campo Obrigatorio');
      expect(messages).toHaveLength(5);
    });

    await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
    userEvent.type(nameInput, 'Computador');
    userEvent.type(priceInput, '5000.12');
    userEvent.type(
      imgUrlInput,
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHIx_4e1S6rInTaGdJs7_bSBXIH1FcdTFGug&usqp=CAU'
    );
    userEvent.type(descriptionInput, 'Computador brabissimo');

    await waitFor(() => {
      const messsages = screen.queryAllByAltText('Campo Obrigatorio');
      expect(messsages).toHaveLength(0);
    });
  });

  describe('Product form update tests', () => {
    beforeEach(() => {
      (useParams as jest.Mock).mockReturnValue({
        productId: '2',
      });
    });

    test('should render form', async () => {
      render(
        <HistoryRouter history={myHistory}>
          <ToastContainer />
          <Form />
        </HistoryRouter>
      );

      await waitFor(() => {
        const nameInput = screen.getByTestId('name');
        const priceInput = screen.getByTestId('price');
        const imgUrlInput = screen.getByTestId('imgUrl');
        const descriptionInput = screen.getByTestId('description');
        const formElement = screen.getByTestId('form');

        expect(nameInput).toHaveValue(productResponse.name);
        expect(priceInput).toHaveValue(String(productResponse.price));
        expect(imgUrlInput).toHaveValue(productResponse.imgUrl);
        expect(descriptionInput).toHaveValue(productResponse.description);

        const ids = productResponse.categories.map((x) => String(x.id));
        expect(formElement).toHaveFormValues({ categories: ids });
      });
      const submitButton = screen.getByRole('button', { name: /salvar/i });

      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      userEvent.click(submitButton);
      await waitFor(() => {
        const toastElement = screen.getByText('Cadastrado');
        expect(toastElement).toBeInTheDocument();
      });
      expect(myHistory.location.pathname).toEqual('/admin/products');
    });
  });
});
