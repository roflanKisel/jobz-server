import supertest from 'supertest';
import UserService from '../../src/modules/authentication/services/authentication';
import { User } from '../../src/models';
import app from '../../src/app';
import config from '../../src/config';

describe('Authentication HTTP Controller', () => {
  let request;
  let server;

  beforeAll(() => {
    server = app.listen(8888);
    request = supertest(server);
  });

  afterAll(() => {
    server.close();
  });

  it('handles GET /signin', () => {
    const mockUserData = { userData: 'test' };

    // UserService.authenticateUser = jest.fn().mockResolvedValue(mockUserData);

    const response = request.post('/signin');

    console.log(response.status);
  });
});
