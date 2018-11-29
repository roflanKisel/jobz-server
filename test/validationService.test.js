import * as ValidationService from '../src/services/validationService';

describe('authenticationService', () => {
  describe('email validator', () => {
    it('validates correct email', () => {
      const mockEmail = 'test1337@test.com';
      const result = ValidationService.isValidEmail(mockEmail);

      expect(result).toBeTruthy();
    });

    it('handles invalid email form', () => {
      const mockEmail = 'test123123';
      const result = ValidationService.isValidEmail(mockEmail);

      expect(result).toBeFalsy();
    });

    it('handles too short email', () => {
      const mockEmail = 'te23';
      const result = ValidationService.isValidEmail(mockEmail);

      expect(result).toBeFalsy();
    });

    it('handles too long email', () => {
      const mockEmail = 'test123123asdsadasdasdasdasdasdasdasdasdasdasdasd@mail.ru';
      const result = ValidationService.isValidEmail(mockEmail);

      expect(result).toBeFalsy();
    });
  });

  describe('password validator', () => {
    it('validates correct password', () => {
      const password = 'testTEST1231';
      const result = ValidationService.isValidPassword(password);

      expect(result).toBeTruthy();
    });

    it('handles invalid password', () => {
      const password = 'testssssssssssssssss';
      const result = ValidationService.isValidPassword(password);

      expect(result).toBeFalsy();
    });

    it('handles too short password', () => {
      const password = 'testp';
      const result = ValidationService.isValidPassword(password);

      expect(result).toBeFalsy();
    });

    it('handles too long password', () => {
      const password = 'asdsssssssssssssssssssssssssssssssssssssssssssssssssssss1221';
      const result = ValidationService.isValidPassword(password);

      expect(result).toBeFalsy();
    });
  });

  describe('fullname validator', () => {
    it('validates correct fullname', () => {
      const fullname = 'Alexander Kiseliov';
      const result = ValidationService.isValidFullname(fullname);

      expect(result).toBeTruthy();
    });

    it('handles invalid fullname', () => {
      const fullname = 'tst1';
      const result = ValidationService.isValidFullname(fullname);

      expect(result).toBeFalsy();
    });
  });

  describe('company name validator', () => {
    it('validates correct company name', () => {
      const company = 'EPAM';
      const result = ValidationService.isValidCompanyName(company);

      expect(result).toBeTruthy();
    });

    it('handles invalid company name', () => {
      const company = 'qw';
      const result = ValidationService.isValidCompanyName(company);

      expect(result).toBeFalsy();
    });
  });

  describe('vacancy name validator', () => {
    it('validates correct vacancy name', () => {
      const vacancy = 'developer';
      const result = ValidationService.isValidVacancyName(vacancy);

      expect(result).toBeTruthy();
    });

    it('handles invalid vacancy name', () => {
      const vacancy = 'vacancyasssssssasdasdasdasdasdasd asd asd asd asdasa sd asdas dasd as';
      const result = ValidationService.isValidVacancyName(vacancy);

      expect(result).toBeFalsy();
    });
  });

  describe('address validator', () => {
    it('validates correct address', () => {
      const address = 'Minsk';
      const result = ValidationService.isValidAddress(address);

      expect(result).toBeTruthy();
    });

    it('handles invalid company name', () => {
      const address = '';
      const result = ValidationService.isValidAddress(address);

      expect(result).toBeFalsy();
    });
  });

  describe('phone number validator', () => {
    it('validates correct phone number', () => {
      const phone = '+375298463854';
      const result = ValidationService.isValidPhoneNumber(phone);

      expect(result).toBeTruthy();
    });

    it('handles invalid phone number', () => {
      const phone = 'qwewqeqwe';
      const result = ValidationService.isValidPhoneNumber(phone);

      expect(result).toBeFalsy();
    });
  });

  describe('employee position validator', () => {
    it('validates correct employee position', () => {
      const employeePosition = 'tester';
      const result = ValidationService.isValidEmployeePosition(employeePosition);

      expect(result).toBeTruthy();
    });

    it('handles invalid employee position', () => {
      const employeePosition = 'qwewqeqwe++';
      const result = ValidationService.isValidEmployeePosition(employeePosition);

      expect(result).toBeFalsy();
    });
  });

  describe('cash validator', () => {
    it('validates correct cash', () => {
      const cash = '550$';
      const result = ValidationService.isValidCash(cash);

      expect(result).toBeTruthy();
    });

    it('handles invalid employee position', () => {
      const cash = 'asdas228$';
      const result = ValidationService.isValidCash(cash);

      expect(result).toBeFalsy();
    });
  });

  describe('cash validator', () => {
    it('validates correct description', () => {
      const description = 'nam nuzhen sotrudnik!!';
      const result = ValidationService.isValidDescription(description);

      expect(result).toBeTruthy();
    });

    it('handles invalid description', () => {
      const description = 'nu';
      const result = ValidationService.isValidDescription(description);

      expect(result).toBeFalsy();
    });
  });
});
