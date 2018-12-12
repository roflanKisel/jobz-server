import request from 'superagent';
import UserService from '../../src/modules/authentication/services/authentication';
import User from '../../src/models/user';
import app from '../../src/app';
import jwtService from '../../src/modules/authentication/services/jwt-service';


const API_URL = 'http://localhost:8888/api';

describe('Authentication HTTP Controller', () => {
  let server;

  beforeEach(() => {
    server = app.listen(8888).on('error', err => console.log(err));
  });

  afterEach(() => {
    server.close();
  });

  it('handles Unauthorized POST /api/auth/signin', async () => {
    UserService.authenticateUser = jest.fn().mockImplementation(() => new Error());

    try {
      await request
        .post(`${API_URL}/auth/signin`)
        .set('Accept', 'application/json');
    } catch (err) {
      expect(err);
    }

    UserService.authenticateUser.mockRestore();
  });

  it('handles Authorized POST /api/auth/signin', async () => {
    const mockUserData = {
      email: 'test',
      password: 'test',
    };

    jest.spyOn(UserService, 'authenticateUser').mockImplementation((ctx) => { ctx.body = { token: 'test' }; });

    User.findOne = jest.fn().mockImplementation(() => mockUserData);

    const response = await request
      .post(`${API_URL}/auth/signin`)
      .set('Accept', 'application/json')
      .send(mockUserData);

    expect(response.status).toEqual(200);

    UserService.authenticateUser.mockRestore();
    User.findOne.mockRestore();
  });

  it('handles POST signup', async () => {
    const mockUser = { email: 'email', password: 'password' };
    User.create = jest.fn().mockImplementation(() => {});
    jest.spyOn(User, 'findOne').mockResolvedValue(null);

    const response = await request
      .post(`${API_URL}/auth/signup`)
      .set('Accept', 'application/json')
      .send(mockUser);

    expect(response.status).toEqual(200);

    User.create.mockRestore();
    User.findOne.mockRestore();
  });

  it('rejects an error on POST signup', async () => {
    const mockUser = { email: 'email', password: 'password' };
    User.create = jest.fn().mockImplementation(() => {});
    User.findOne = jest.fn().mockResolvedValue({});

    try {
      await request
        .post(`${API_URL}/auth/signup`)
        .set('Accept', 'application/json')
        .send(mockUser);
    } catch (err) {
      expect(err);
    }

    User.create.mockRestore();
    User.findOne.mockRestore();
  });

  it('finds user by token', async () => {
    const mockUser = { email: 'test' };
    UserService.findUser = jest.fn().mockResolvedValue(mockUser);

    const response = await request
      .post(`${API_URL}/auth/private`)
      .set('Accept', 'application/json')
      .send({ token: 'token' });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(mockUser);

    UserService.findUser.mockRestore();
  });

  it('rejects an error if user is not found', async () => {
    UserService.findUser = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    try {
      await request
        .post(`${API_URL}/auth/private`)
        .set('Accept', 'application/json')
        .send({ token: 'token' });
    } catch (err) {
      expect(err);
    }

    UserService.findUser.mockRestore();
  });

  it('deletes user by token', async () => {
    const mockUser = {
      destroy: jest.fn(),
    };

    jwtService.verify = jest.fn().mockReturnValue({});
    User.findOne = jest.fn().mockResolvedValue(mockUser);

    const response = await request
      .post(`${API_URL}/auth/delete`)
      .set('Accept', 'application/json')
      .send({ token: 'token' });

    expect(response.status).toEqual(200);
    expect(mockUser.destroy).toHaveBeenCalled();

    jwtService.verify.mockRestore();
    User.findOne.mockRestore();
  });

  it('rejects an error deleting user by not valid token', async () => {
    jwtService.verify = jest.fn().mockReturnValue({});
    User.findOne = jest.fn().mockResolvedValue(null);

    try {
      await request
        .post(`${API_URL}/auth/delete`)
        .set('Accept', 'application/json')
        .send({ token: 'token' });
    } catch (err) {
      expect(err);
    }

    jwtService.verify.mockRestore();
    User.findOne.mockRestore();
  });

  it('deletes user by id', async () => {
    const mockUser = {
      destroy: jest.fn(),
    };

    jwtService.verify = jest.fn().mockReturnValue({});
    User.findOne = jest.fn().mockResolvedValue(mockUser);

    const response = await request
      .post(`${API_URL}/auth/admin/delete`)
      .set('Accept', 'application/json')
      .send({ token: 'token' });

    expect(response.status).toEqual(200);
    expect(mockUser.destroy).toHaveBeenCalled();

    jwtService.verify.mockRestore();
    User.findOne.mockRestore();
  });

  it('rejects an error if user is not admin', async () => {
    jwtService.verify = jest.fn().mockReturnValue({});
    User.findOne = jest.fn().mockResolvedValue(null);

    try {
      await request
        .post(`${API_URL}/auth/delete`)
        .set('Accept', 'application/json')
        .send({ token: 'token' });
    } catch (err) {
      expect(err);
    }

    jwtService.verify.mockRestore();
    User.findOne.mockRestore();
  });

  it('creates user when user service is not throws it on sign up', async () => {
    const mockUser = { email: 'email', password: 'password' };
    UserService.createUser = jest.fn().mockResolvedValue(mockUser);

    const response = await request
      .post(`${API_URL}/auth/signup`)
      .set('Accept', 'application/json')
      .send(mockUser);

    expect(response.status).toEqual(200);

    User.create.mockRestore();
    User.findOne.mockRestore();
  });

  it('rejects an error when user service throws it on sign up', async () => {
    const mockUser = { email: 'email', password: 'password' };
    UserService.createUser = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    try {
      await request
        .post(`${API_URL}/auth/signup`)
        .set('Accept', 'application/json')
        .send(mockUser);
    } catch (err) {
      expect(err);
    }

    User.create.mockRestore();
    User.findOne.mockRestore();
  });

  it('gets an user if it found', async () => {
    const mockUser = { email: 'test' };
    jwtService.verify = jest.fn().mockReturnValue(mockUser);
    User.findOne = jest.fn().mockResolvedValue(mockUser);

    const response = await request
      .post(`${API_URL}/auth/private`)
      .set('Accept', 'application/json')
      .send({ token: 'token' });

    expect(response.status).toEqual(200);

    User.findOne.mockRestore();
    jwtService.verify.mockRestore();
  });


  it('rejects an error if user not found', async () => {
    User.findOne = jest.fn().mockResolvedValue(null);

    try {
      await request
        .post(`${API_URL}/auth/private`)
        .set('Accept', 'application/json')
        .send({ token: 'token' });
    } catch (err) {
      expect(err);
    }

    User.findOne.mockRestore();
  });
});
