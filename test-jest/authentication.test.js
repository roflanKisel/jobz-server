import sinon from 'sinon';
import { User } from '../src/models';
import AuthenticationService from '../src/modules/authentication/services/authentication';
import jwtService from '../src/modules/authentication/services/jwt-service';

describe('Authentication', () => {
  let jwtStub, jwtVerify;

  beforeAll(() => {
    jwtStub = sinon.stub(jwtService, 'getToken').returns('token');
    jwtVerify = sinon.stub(jwtService, 'verify').returns({});
  });

  afterAll(() => {
    jwtStub.restore();
    jwtVerify.restore();
  });

  describe('createUser', () => {
    it('creates a user and returns user data', async () => {
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User, 'create').resolves();

      const userData = await AuthenticationService.createUser({ email: 'email' });

      expect(userData).toStrictEqual({
        token: 'token',
        user: {
          email: 'email',
          password: undefined,
        },
      });

      User.findOne.restore();
      User.create.restore();
    });

    it('throws an error if user is already exists', () => {
      sinon.stub(User, 'findOne').resolves({});

      expect(AuthenticationService.createUser({ email: 'email' }))
        .rejects.toEqual(new Error('User is already exist'));

      User.findOne.restore();
    });
  });

  describe('findUser', () => {
    it('finds user by token', async () => {
      sinon.stub(User, 'findOne').resolves({ user: 'test' });

      const foundUser = await AuthenticationService.findUser();

      expect(foundUser).toStrictEqual({
        user: 'test',
      });

      User.findOne.restore();
    });

    it('throws an error if user not found', () => {
      sinon.stub(User, 'findOne').resolves(null);

      expect(AuthenticationService.findUser())
        .rejects.toEqual(new Error('User is not found'));

      User.findOne.restore();
    });
  });

  describe('findUserById', () => {
    afterEach(() => {
      User.findOne.restore();
    });

    it('returns found user data', async () => {
      sinon.stub(User, 'findOne').resolves({ data: 'test' });

      const userData = await AuthenticationService.findUserById('3');

      expect(userData).toStrictEqual({
        data: 'test',
      });
    });

    it('throws an error if user by provided id not found', () => {
      sinon.stub(User, 'findOne').resolves(null);

      expect(AuthenticationService.findUserById('54'))
        .rejects.toEqual(new Error('User with id: 54 not found'));
    });
  });


  describe('deleteUserUsingToken', () => {
    afterEach(() => {
      User.findOne.restore();
    });

    it('deletes user by token', async () => {
      sinon.stub(User, 'findOne').resolves({
        destroy: () => ({}),
      });

      const deletedUser = await AuthenticationService.deleteUserUsingToken();

      expect(deletedUser).toBeTruthy();
    });

    it('throws an error if token is invalid', () => {
      sinon.stub(User, 'findOne').resolves(null);

      expect(AuthenticationService.deleteUserUsingToken())
        .rejects.toEqual(new Error('Error deleting user'));
    });
  });

  describe('deleteUserUsingId', () => {
    afterEach(() => {
      User.findOne.restore();
    });

    it('deletes user using id', async () => {
      sinon.stub(User, 'findOne')
        .onFirstCall().resolves({})
        .onSecondCall().resolves({
          destroy: () => ({}),
        });

      const deletedUser = await AuthenticationService.deleteUserUsingId();

      expect(deletedUser).toBeTruthy();
    });

    it('throws an error if user with id not found', () => {
      sinon.stub(User, 'findOne')
        .onFirstCall().resolves({})
        .onSecondCall().resolves(null);

      expect(AuthenticationService.deleteUserUsingId('token', '3'))
        .rejects.toEqual(new Error('User with id: 3 not found'));
    });

    it('throws an error if action provided by not admin', () => {
      sinon.stub(User, 'findOne')
        .onFirstCall().resolves(null)
        .onSecondCall().resolves(null);

      expect(AuthenticationService.deleteUserUsingId())
        .rejects.toEqual(new Error('Permission denied'));
    });
  });
});
