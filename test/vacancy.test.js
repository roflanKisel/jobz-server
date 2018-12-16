import VacancyController from '../src/modules/vacancy/controllers/vacancy-controller';
import VacancyService from '../src/modules/vacancy/services/vacancy-service';
import { Vacancy } from '../src/models';

describe('Vacancy', () => {
  it('gets all vacancies', () => {
    Vacancy.findAll = jest.fn().mockResolvedValue([]);

    VacancyController.getVacancies();

    expect(Vacancy.findAll).toHaveBeenCalledTimes(1);

    Vacancy.findAll.mockRestore();
  });

  it('adds vacancy', () => {
    const mockVacancy = { test: 'test' };
    Vacancy.create = jest.fn().mockResolvedValue(mockVacancy);

    VacancyService.createVacancy(mockVacancy);

    expect(Vacancy.create).toHaveBeenCalledTimes(1);
    expect(Vacancy.create).toHaveBeenCalledWith(mockVacancy);

    Vacancy.create.mockRestore();
  });
});
