import { range } from './array';

test('range', () => {
  expect(range(1, 3)).toStrictEqual([1, 2, 3]);
});
