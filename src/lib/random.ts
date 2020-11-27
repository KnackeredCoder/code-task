export function getRandomNumber(min: number, max: number) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);

  return Math.floor(Math.random() * (maxFloor - minCeil + 1) + minCeil);
}

export function getFiftyFifty() {
  return Math.random() < 0.5;
}
