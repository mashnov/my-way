export const getRandomNumber = (from = 0, till = 1) => {
  return Math.floor(from + Math.random() * (till + 1 - from))
}
