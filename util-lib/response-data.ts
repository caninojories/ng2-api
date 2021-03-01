import { Model } from 'mongoose';

export enum ResponseType {
  ok,
  internalError,
  pathNotFoundError,
  resourceNotFoundError,
  resourceApiNotFoundError,
  securityError,
  dataValidationFailure,
  scopeMissingError,
  expiredEmailConfirmation,
  invalidEmailConfirmation,
  unsupportedPatchPath,
  unsupportedPatchOperation,
}

export interface IResponseData {
  code: ResponseType;
  type: string;
  message?: string;
  errorId?: string;
  data?: any;
  _id?: string;
}

export class ResponseData implements IResponseData {
  public code: ResponseType;
  public type: string;
  public errorId: string;
  public message: string;
  public data: any;
  public _id: string;

  public static createInternalError(message: string, errorId?: string): ResponseData {
    return new ResponseData({
      code: ResponseType.internalError,
      errorId: errorId || 'not set',
      type: ResponseType[ResponseType.internalError],
      message: message,
    });
  }

  public static createOk(message?: string): ResponseData {
    return new ResponseData({
      code: ResponseType.ok,
      type: ResponseType[ResponseType.ok],
      message: message,
    });
  }

  public static createValidationFailure(message: string): ResponseData {
    return new ResponseData({
      code: ResponseType.dataValidationFailure,
      type: ResponseType[ResponseType.dataValidationFailure],
      message: message,
      data: {},
    });
  }

  public static createExpiredEmailValidationFailure(message: string): ResponseData {
    return new ResponseData({
      code: ResponseType.expiredEmailConfirmation,
      type: ResponseType[ResponseType.expiredEmailConfirmation],
      message: message,
    });
  }

  public static createInvalidEmailValidationFailure(message: string): ResponseData {
    return new ResponseData({
      code: ResponseType.invalidEmailConfirmation,
      type: ResponseType[ResponseType.invalidEmailConfirmation],
      message: message,
    });
  }

  public static create404(message: string): ResponseData {
    return new ResponseData({
      code: ResponseType.pathNotFoundError,
      type: ResponseType[ResponseType.pathNotFoundError],
      message: message,
    });
  }

  public static createResource404(message: string): ResponseData {
    return new ResponseData({
      code: ResponseType.resourceNotFoundError,
      type: ResponseType[ResponseType.resourceNotFoundError],
      message: message,
    });
  }

  public static createApiResource404(message: string): ResponseData {
    return new ResponseData({
      code: ResponseType.resourceApiNotFoundError,
      type: ResponseType[ResponseType.resourceApiNotFoundError],
      message: message,
    });
  }

  public static createSecurityError(message: string): ResponseData {
    return new ResponseData({
      code: ResponseType.securityError,
      type: ResponseType[ResponseType.securityError],
      message: message,
    });
  }

  public static createScopeMissingError(message: string): ResponseData {
    return new ResponseData({
      code: ResponseType.scopeMissingError,
      type: ResponseType[ResponseType.scopeMissingError],
      message: message,
    });
  }

  public static createObjectIdInstance(id: string): ResponseData {
    return new ResponseData({
      code: ResponseType.ok,
      type: ResponseType[ResponseType.ok],
      _id: id,
    });
  }

  public static createModelInstance(modelInstance: Model<any>): ResponseData {
    return new ResponseData({
      code: ResponseType.ok,
      type: ResponseType[ResponseType.ok],
      data: modelInstance,
    });
  }

  public static createDataInstance(
    data: string | Record<string, unknown> | number | Array<any>
  ): ResponseData {
    return new ResponseData({
      code: ResponseType.ok,
      type: ResponseType[ResponseType.ok],
      data: data,
    });
  }

  public static createUnsupportedPatchPath(message: string): ResponseData {
    return new ResponseData({
      code: ResponseType.unsupportedPatchPath,
      type: ResponseType[ResponseType.unsupportedPatchPath],
      message: message,
    });
  }

  public static createUnsupportedPatchOperation(message: string): ResponseData {
    return new ResponseData({
      code: ResponseType.unsupportedPatchOperation,
      type: ResponseType[ResponseType.unsupportedPatchOperation],
      message: message,
    });
  }

  constructor(options: IResponseData) {
    this.code = options.code;
    this.type = options.type;
    this.errorId = options.errorId;

    if (options.message) {
      this.message = options.message;
    }
    if (options.data) {
      this.data = options.data;
    }
    if (options._id) {
      this._id = options._id;
    }
  }
}
