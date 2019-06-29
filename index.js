const Coin = (int, qty, unit) => ({
  name: 'Coin',
  value: int * (unit === 'cent' ? 0.01 : 1.0) * qty,
});

const Note = (int, qty) => ({
  tag: 'Note',
  value: int * qty,
});

const defineProducts = (fields) =>
  fields.reduce(
    (acc, T) => ({
      // This order means first come first called
      [T.length]: T,
      ...acc,
    }),
    {},
  );

const SumType = (types, failure) => {
  const products = defineProducts(types);

  return (...args) => {
    const len = String(args.length);
    if (products[len]) {
      return products[len](...args);
    }

    return failure(...args);
  }
};

const Money = SumType(
  [Coin, Note],
  (_) => {
    throw new TypeError('Invalid data structure provided');
  }
);

const coins = Money(10, 5, 'cent');
const cash = Money(6, 20);

console.log({
  coins: `Value: $${coins.value}`, // => Value: $0.5
  cash: `Value: $${cash.value}`, // => Value: $120
});
