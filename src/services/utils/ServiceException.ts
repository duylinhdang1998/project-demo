import { getI18n } from 'react-i18next';
import { ResponseFailure } from 'services/models/Response';
import { StatusCodeMappingToString, StringMappingToStatusCode } from 'services/models/StatusCode';

export class ServiceException extends Error {
  cause: ResponseFailure;
  static getMessageError: (error: unknown) => string;
  constructor(message: string, cause: ResponseFailure) {
    super(message);
    this.name = 'ServiceException';
    this.cause = cause;
  }
}

ServiceException.getMessageError = (error: unknown) => {
  const i18n = getI18n();
  const errorCode = error instanceof ServiceException ? error.cause.code : StringMappingToStatusCode.UNKNOWN;
  return i18n.t(`message_error:${StatusCodeMappingToString[errorCode]}`);
};
