import { formatMoney } from './number';

test(`formatMoney`, () => {
  expect(formatMoney(10000)).toMatchInlineSnapshot(`"10,000"`);
  expect(formatMoney(3050300)).toMatchInlineSnapshot(`"3,050,300"`);
  expect(formatMoney(1000.3492)).toMatchInlineSnapshot(`"1,000.35"`);
  expect(formatMoney(1.2312345757949125e22)).toMatchInlineSnapshot(
    `"12,312,345,757,949,125,000,000"`
  );
  expect(formatMoney(undefined)).toMatchInlineSnapshot(`""`);
  expect(
    formatMoney(100, { currency: 'MYR', minDecimal: 2 })
  ).toMatchInlineSnapshot(`"RM 100.00"`);

  expect(
    formatMoney(0.5, { currency: 'MYR', minDecimal: 2 })
  ).toMatchInlineSnapshot(`"RM 0.50"`);

  expect(formatMoney(0.3212, { currency: 'SGD' })).toMatchInlineSnapshot(
    `"SGD 0.32"`
  );
});
