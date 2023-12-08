import { render, screen } from '@testing-library/react';
import ButtonIcon from '../';

test('buttonIcon should render button with given text', () => {
  const text = 'FAZER LOGIN';

  render(<ButtonIcon text={text} />);

  /*
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug();
  */

  expect(screen.getByText(text)).toBeInTheDocument();
  expect(screen.getByTestId('arrow')).toBeInTheDocument();
});
