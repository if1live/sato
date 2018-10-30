import { hello } from '@src/helpers';

test('hello', () => {
  expect(hello()).toEqual('hello');
});
