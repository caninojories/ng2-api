import { Api } from '../api';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as supertest from 'supertest';

describe('POST /api/v1/travel/addState', function () {
  let sandbox;
  let request;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    request = supertest(Api.getApi().app);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('sample test', () => {
    request
      .get('/api/v1/products')
      .send({})
      .expect(200)
      .then((response: any) => {
        expect(response.body).to.be.equal('OK');
      });
  });
});
