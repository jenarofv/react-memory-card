export function getRandomIntegers(amount, limit) {
  const randomNumbers = new Set([]);
  while (randomNumbers.size < amount) {
    randomNumbers.add(Math.floor(Math.random() * limit + 1));
  }
  return randomNumbers;
}
