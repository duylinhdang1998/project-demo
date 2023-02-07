export class ServiceException extends Error {
  constructor(message: string, cause: any) {
    super(message);
    this.name = "ServiceException";
    this.cause = cause;
  }
}
