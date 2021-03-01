import { injectable } from 'inversify';
import * as moment from 'moment';
import * as jwtsimple from 'jwt-simple';
const CONFIG = require('../config/env.js');

@injectable()
export class Jwt {
  encode(_decipher?: { user: { email: string } }): string {
    const payload = {
      email: _decipher.user.email,
      exp: moment().add(15, 'days').unix(),
    };

    const token = jwtsimple.encode(payload, CONFIG.ENCODEDHASH);

    return token;
  }

  decode(authorization: string): Promise<string> {
    return new Promise<any>((resolve, reject) => {
      if (!authorization) {
        reject();
      }

      const token = jwtsimple.decode(authorization, CONFIG.ENCODEDHASH);

      resolve(token);
    });
  }
}
