interface CauseError {
  code: 1000 | 1005;
  timestamp: string;
  path: string;
  message: string;
}

export class ServiceException extends Error {
  cause: CauseError;
  constructor(message: string, cause: any) {
    super(message);
    this.name = 'ServiceException';
    this.cause = cause;
  }
}
