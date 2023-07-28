export class CustomError extends Error {
  constructor(params) {
    const { message, status } = params;
    super(message);

    this.status = status;
  }
}
