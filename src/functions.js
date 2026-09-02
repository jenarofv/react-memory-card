export function getRandomIntegers(amount, limit) {
  if (limit < amount) {
    throw new RangeError(
      "amount should be less than or equal to limit, not the other way around",
    );
  }
  const randomNumbers = new Set([]);
  while (randomNumbers.size < amount) {
    randomNumbers.add(Math.floor(Math.random() * limit + 1));
  }
  return randomNumbers;
}
