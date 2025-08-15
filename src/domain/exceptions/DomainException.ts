export abstract class DomainException extends Error {
  public readonly name: string;
  public readonly message: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
  }
}
