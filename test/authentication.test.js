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

  describe('deleteUserUsingToken', () => {
    afterEach(() => {
      User.findOne.restore();
    });

    it('delete user by token', async () => {
      sinon.stub(User, 'findOne').resolves({
        destroy: () => ({}),
      });

      const deletedUser = await AuthenticationService.deleteUserUsingToken();
      assert.ok(deletedUser);
    });

    it('throws an error if token is invalid', async () => {
      sinon.stub(User, 'findOne').resolves(null);

      try {
        await AuthenticationService.deleteUserUsingToken();
      } catch (err) {
        assert.equal(err, 'Error: Error deleting user')
      }
    });
  });

  describe('deleteUserUsingId', () => {
    afterEach(() => {
      User.findOne.restore();
    });

    it('delete user using id', async () => {
      sinon.stub(User, 'findOne')
        .onFirstCall().resolves({})
        .onSecondCall().resolves({
          destroy: () => ({}),
        });

      const deletedUser = await AuthenticationService.deleteUserUsingId();

      assert.ok(deletedUser);
    });

    it('should throw an error if user with id not found', async () => {
      sinon.stub(User, 'findOne')
        .onFirstCall().resolves({})
        .onSecondCall().resolves(null);

      try {
        await AuthenticationService.deleteUserUsingId('token', '3');
      } catch (err) {
        assert.equal(err, 'Error: User with id: 3 not found');
      }
    });

    it('sohuld throw an error if action provided by not admin', async () => {
      sinon.stub(User, 'findOne')
        .onFirstCall().resolves(null)
        .onSecondCall().resolves(null);

      try {
        await AuthenticationService.deleteUserUsingId();
      } catch (err) {
        assert.equal(err, 'Error: Permission denied');
      }
    });
  });
});
