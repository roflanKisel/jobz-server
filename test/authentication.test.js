import assert from 'assert';
import { describe, it, beforeEach, afterEach } from 'mocha';
import AuthenticationService from '../src/modules/authentication/services/authentication';

const sandbox = require('sinon').createSandbox();

describe('Authentication', () => {
  beforeEach(() => {
    sandbox.stub(AuthenticationService, 'createUser')
      .returns({
        token: 'test-token',
        user: {
          id: 4,
          email: 'test@test.test',
          name: 'test',
          birthday: new Date('2000-02-20'),
        },
      });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should create user', () => {
    const userData = AuthenticationService.createUser();
    const testData = {
      token: 'test-token',
      user: {
        id: 4,
        email: 'test@test.test',
        name: 'test',
        birthday: new Date('2000-02-20'),
      },
    };

    assert.deepEqual(userData, testData);
  });

  it('should create user', () => {
    const userData = AuthenticationService.createUser();
    const testData = {
      token: 'test-token-failure',
      user: {
        id: 4,
        email: 'test@test.test',
        name: 'test',
        birthday: new Date('2000-02-20'),
      },
    };

    assert.notDeepEqual(userData, testData);
  });
});
