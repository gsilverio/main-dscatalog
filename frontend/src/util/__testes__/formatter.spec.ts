import { formatPrice } from '../formatters';

test('formatPrice should format number pt-BR when given 10.1', () => {
  //AAA->
  //ARRANGE
  const value = 10.1;

  //ACT
  const result = formatPrice(value);

  //ASSERT
  expect(result).toEqual('10,10');
});
