export function pipe(...fns: Function[]): Function {
  return (x: any) => fns.reduce((y, f) => f(y), x);
}
