import {
  Api
} from '../api';
import * as express from 'express';
import {expect} from 'chai'
import * as sinon from 'sinon';
import * as supertest from 'supertest';

describe('POST /api/v1/travel/addState', function () {
  let sandbox;
  let request;

  beforeEach(() => {
    console.log('beforeEach')
    sandbox = sinon.createSandbox();
    request = supertest(Api.getApp())
              .get('/api/v1/user');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('sample test', () => {
    request
      .send({})
      .expect(200)
      .then((response: express.Response) => {
        expect(response.body).to.be.equal('OK');
      });
  });
});