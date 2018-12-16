import { User, Company, Vacancy } from '../src/models';
import UserController from '../src/modules/user/controllers/user-controller';
import UserService from '../src/modules/user/services/user-service';

describe('User Controller', () => {
  it('gets all users', () => {
    User.findAll = jest.fn().mockResolvedValue([]);

    UserController.getUsers();

    expect(User.findAll).toHaveBeenCalledTimes(1);

    User.findAll.mockRestore();
  });

  it('gets user companies', () => {
    Company.findAll = jest.fn().mockResolvedValue([]);

    UserService.getUserCompanies();

    expect(Company.findAll).toHaveBeenCalledTimes(1);

    Company.findAll.mockRestore();
  });

  it('gets user vacancies', () => {
    Vacancy.findAll = jest.fn().mockResolvedValue([]);

    UserService.getUserVacancies();

    expect(Vacancy.findAll).toHaveBeenCalledTimes(1);

    Vacancy.findAll.mockRestore();
  });
});
