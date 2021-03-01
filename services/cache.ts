import * as express from 'express';

export class Cache {
  init(_req: express.Request, res: express.Response, next: express.NextFunction): void {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    next();
  }
}
