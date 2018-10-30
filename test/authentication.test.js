import sinon from 'sinon';
import assert from 'assert';
import { User } from '../src/models';
import AuthenticationService from '../src/modules/authentication/services/authentication';
import jwtService from '../src/modules/authentication/services/jwt-service';

describe('Authentication', () => {
  let jwtStub, jwtVerify;

  before(() => {
    jwtStub = sinon.stub(jwtService, 'getToken').returns('token');
    jwtVerify = sinon.stub(jwtService, 'verify').returns({});
  });

  after(() => {
    jwtStub.restore();
    jwtVerify.restore();
  });

  describe('createUser', () => {
    it('creates a user and returns user data', async () => {
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User, 'create').resolves();

      const userData = await AuthenticationService.createUser({ email: 'email' });

      assert.deepEqual(userData, {
        token: 'token',
        user: {
          email: 'email',
          password: undefined,
        },
      });

      User.findOne.restore();
      User.create.restore();
    });

    it('throws an error if user is already exists', async () => {
      sinon.stub(User, 'findOne').resolves({});

      try {
        await AuthenticationService.createUser({ email: 'email' })
      } catch (err) {
        assert.equal(err, 'Error: User is already exist');
      }

      User.findOne.restore();
    });
  });

  describe('findUser', () => {
    it('find a user by token', async () => {
      sinon.stub(User, 'findOne').resolves({ user: 'test' });

      const foundUser = await AuthenticationService.findUser();

      assert.deepEqual(foundUser, {
        user: 'test',
      });

      User.findOne.restore();
      jwtService.getToken.restore();
    });

    it('throws an error if user not found', async () => {
      sinon.stub(User, 'findOne').resolves(null);

      try {
        await AuthenticationService.findUser();
      } catch (err) {
        assert.equal(err, 'Error: User is not found');
      }

      User.findOne.restore();
    });
  });
});
