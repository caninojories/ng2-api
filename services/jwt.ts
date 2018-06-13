import {
  injectable,
  inject
} from 'inversify';
import * as moment from 'moment';
import * as jwtsimple from 'jwt-simple';
let CONFIG = require('../config/env.js');

@injectable()
export class Jwt {
  constructor() {}

  encode(_decipher? : any) {
    let payload = {
      email: _decipher.user.email,
      exp: moment().add(15, 'days').unix()
    };

    let token = jwtsimple.encode(payload, CONFIG.ENCODEDHASH);

    return token;
  }

  decode(authorization) {
    return new Promise<any>((resolve, reject) => {
      if (!authorization) {
        reject();
      }

     let token = jwtsimple.decode(authorization, CONFIG.ENCODEDHASH);

     resolve(token);
   });
  }
}
