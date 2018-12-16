import { User, Company, Vacancy, UserVacancies } from '../src/models';
import UserController from '../src/modules/user/controllers/user-controller';
import UserService from '../src/modules/user/services/user-service';

describe('User Controller', () => {
  // describe('Getting user by id', () => {

  // });

  describe('Get one user', () => {
    it('gets one user if it exists', async () => {
      const mockUser = { email: 'test' };
      User.findOne = jest.fn().mockResolvedValue(mockUser);

      const mockCtx = {
        params: {
          id: 'id',
        },
      };

      await UserController.getUser(mockCtx);

      expect(mockCtx.body).toEqual(mockUser);

      User.findOne.mockRestore();
    });

    it('throws an error if user dont exist', async () => {
      User.findOne = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      const mockCtx = {
        params: {
          id: 'id',
        },
      };

      await UserController.getUser(mockCtx);

      expect(mockCtx.status).toEqual(500);

      User.findOne.mockRestore();
    });
  });

  describe('Favorite Vacancies', () => {
    describe('Getting vacancies', () => {
      it('gets user vacancies', () => {
        Vacancy.findAll = jest.fn().mockResolvedValue([]);

        UserService.getUserVacancies();

        expect(Vacancy.findAll).toHaveBeenCalledTimes(1);

        Vacancy.findAll.mockRestore();
      });
    });

    describe('Adding vacancy', () => {
      afterEach(() => {
        UserVacancies.create.mockRestore();
      });

      it('adds vacancy if not exist', async () => {
        const mockVacancy = { name: 'name' };
        UserVacancies.create = jest.fn().mockResolvedValue(mockVacancy);

        const mockCtx = {
          request: {
            body: {},
          },
          params: {
            id: 'id',
          },
        };

        await UserController.addUserFavoriteVacancy(mockCtx);

        expect(mockCtx.body).toEqual(mockVacancy);
      });

      it('throws an error if vacancy already in favorites', async () => {
        UserVacancies.create = jest.fn().mockImplementation(() => {
          throw new Error();
        });

        const mockCtx = {
          params: {
            id: 'id',
          },
        };

        await UserController.addUserFavoriteVacancy(mockCtx);

        expect(mockCtx.status).toEqual(409);
      });
    });

    describe('Removing vacancy', () => {
      afterEach(() => {
        UserVacancies.findOne.mockRestore();
      });

      it('removes vacancy if it exist', async () => {
        UserVacancies.findOne = jest.fn().mockResolvedValue(null);

        const mockCtx = {
          params: {
            id: 'id',
          },
          query: {},
        };

        await UserController.removeUserFavoriteVacancy(mockCtx);

        expect(mockCtx.body.success).toBeTruthy();
      });

      it('throws an error if vacancy is not exist', async () => {
        UserVacancies.findOne = jest.fn().mockImplementation(() => {
          throw new Error();
        });

        const mockCtx = {
          params: {
            id: 'id',
          },
          query: {},
        };

        await UserController.removeUserFavoriteVacancy(mockCtx);

        expect(mockCtx.status).toEqual(409);
      });
    });
  });

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
});
