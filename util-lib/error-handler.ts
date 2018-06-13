import {ResponseData} from './response-data';
import {Logger} from './logger';
import {HttpStatusCodesEnum} from './http-status-codes';
import {Request, Response, NextFunction, ErrorRequestHandler} from 'express';

export class ErrorHandler {

  public static init(): ErrorRequestHandler {
    // Do not remove unused last argument.
    // Otherwise it will become 3 args middleware and will be treated as ordinary middleware (req, res, next).
    return (error: Error, request: Request, response: Response, next: NextFunction) => {
      Logger.error(error);
      switch (error.name) {
        case 'ResourceExistError':
          response.status(HttpStatusCodesEnum.CONFLICT).json(
            ResponseData.createValidationFailure(error.message),
          ).end();
          break;
        case 'ResourceNotFoundError':
          response.status(HttpStatusCodesEnum.NOT_FOUND).json(
            ResponseData.createResource404(error.message),
          ).end();
          break;

        case 'ApiNotFoundError':
          response.status(HttpStatusCodesEnum.NOT_FOUND).json(
            ResponseData.createApiResource404(error.message),
          ).end();
          break;
        default:
          response.status(HttpStatusCodesEnum.INTERNAL_SERVER_ERROR).json(
            ResponseData.createInternalError('Unable to complete operation due to an internal error.'),
          ).end();
      }
    };
  }
}
