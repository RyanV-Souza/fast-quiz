export class LimitExcedeedError extends Error {
  constructor() {
    super("Daily limit exceeded");
    this.name = "LimitExcedeedError";
  }
}
