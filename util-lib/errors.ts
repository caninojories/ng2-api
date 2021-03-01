export class UnAuthorizedError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'UnAuthorizedError';
  }
}

export class ResourceExistError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'ResourceExistError';
  }
}

export class ResourceNotFoundError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'ResourceNotFoundError';
  }
}

export class ApiNotFoundError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'ApiNotFoundError';
  }
}

export class ResourceMismatchError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'ResourceMismatchError';
  }
}

export class InvalidEmailConfirmError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'InvalidEmailConfirmError';
  }
}

export class ExpiredEmailConfirmError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'ExpiredEmailConfirmError';
  }
}

export class MetadataNotFoundError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'MetadataNotFoundError';
  }
}

export class PatchRulesNotFoundError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'PatchRulesNotFoundError';
  }
}

export class UnsupportedPatchPath extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'UnsupportedPatchPath';
  }
}

export class UnsupportedPatchOperation extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'UnsupportedPatchOperation';
  }
}

export class ValidationError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'ValidationError';
  }
}
