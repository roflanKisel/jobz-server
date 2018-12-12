import { Company } from '../src/models';
import CompanyService from '../src/modules/company/services/company-service';
import CompanyController from '../src/modules/company/controllers/company-controller';

describe('Company', () => {
  const mockData = { test: 'test' };

  describe('CompanyService', () => {
    it('creates new company', async () => {
      Company.create = jest.fn().mockResolvedValue(mockData);

      const result = await CompanyService.createCompany(mockData);

      expect(result).toEqual(mockData);

      Company.create.mockRestore();
    });
  });

  describe('CompanyController', () => {
    describe('creating', () => {
      let mockCtx;

      beforeEach(() => {
        mockCtx = { request: { body: 'test' } };
      });

      it('creates new company', async () => {
        jest.spyOn(CompanyService, 'createCompany').mockResolvedValue(mockData);

        await CompanyController.addCompany(mockCtx);

        expect(CompanyService.createCompany).toHaveBeenCalledTimes(1);
        expect(CompanyService.createCompany).toHaveBeenCalledWith(mockCtx.request.body);

        CompanyService.createCompany.mockRestore();
      });

      it('handles an error if service throws it', async () => {
        jest.spyOn(CompanyService, 'createCompany').mockImplementation(() => { throw new Error(); });

        await CompanyController.addCompany(mockCtx);

        expect(CompanyService.createCompany).toHaveBeenCalledTimes(1);
        expect(CompanyService.createCompany).toHaveBeenCalledWith(mockCtx.request.body);

        CompanyService.createCompany.mockRestore();
      });
    });

    describe('Updating', () => {
      let mockCtx;

      beforeEach(() => {
        mockCtx = { company: 'company', request: { body: 'test' } };
      });

      it('updates company', async () => {
        jest.spyOn(CompanyService, 'updateCompany').mockResolvedValue(mockData);

        await CompanyController.updateCompany(mockCtx);

        expect(CompanyService.updateCompany).toHaveBeenCalledTimes(1);

        CompanyService.updateCompany.mockRestore();
      });

      it('handles an error if update service throws it', async () => {
        jest.spyOn(CompanyService, 'updateCompany').mockImplementation(() => { throw new Error(); });

        await CompanyController.updateCompany(mockCtx);

        expect(CompanyService.updateCompany).toHaveBeenCalledTimes(1);

        CompanyService.updateCompany.mockRestore();
      });
    });

    describe('Deleting', () => {
      let mockCtx;

      beforeEach(() => {
        mockCtx = { company: 'company' };
      });

      it('deletes a company', async () => {
        jest.spyOn(CompanyService, 'deleteCompany').mockResolvedValue(mockData);

        await CompanyController.deleteCompany(mockCtx);

        expect(CompanyService.deleteCompany).toHaveBeenCalledTimes(1);

        CompanyService.deleteCompany.mockRestore();
      });

      it('handles an error if delete service throws it', async () => {
        jest.spyOn(CompanyService, 'deleteCompany').mockImplementation(() => { throw new Error(); });

        await CompanyController.deleteCompany(mockCtx);

        expect(CompanyService.deleteCompany).toHaveBeenCalledTimes(1);

        CompanyService.deleteCompany.mockRestore();
      });
    });

    describe('Getting', () => {
      it('deletes a company', async () => {
        jest.spyOn(Company, 'findAll').mockResolvedValue([]);

        await CompanyController.getCompanies();

        expect(Company.findAll).toHaveBeenCalledTimes(1);

        Company.findAll.mockRestore();
      });

      it('handles an error if delete service throws it', async () => {
        jest.spyOn(Company, 'findAll').mockImplementation(() => { throw new Error(); });

        await CompanyController.getCompanies();

        expect(Company.findAll).toHaveBeenCalledTimes(1);

        Company.findAll.mockRestore();
      });
    });
  });
});
