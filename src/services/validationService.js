const isValidEmail = (email) => {
  if (email.length < 7 || email.length > 25) {
    return false;
  }

  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email);
};

const isValidPassword = (password) => {
  if (password.length < 7 || password.length > 25) {
    return false;
  }

  const regex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

  return regex.test(password);
};

const isValidFullname = (fullname) => {
  if (fullname.length < 7 || fullname.length > 35) {
    return false;
  }

  const regex = /^[a-zA-Z ]*$/;

  return regex.test(fullname);
};

const isValidCompanyName = (companyName) => {
  if (companyName.length < 3 || companyName.length > 20) {
    return false;
  }

  const regex = /^[a-zA-Z ]*$/;

  return regex.test(companyName);
};

const isValidVacancyName = (vacancyName) => {
  if (vacancyName.length < 3 || vacancyName.length > 30) {
    return false;
  }

  const regex = /^[a-zA-Z ]*$/;

  return regex.test(vacancyName);
};

const isValidAddress = (address) => {
  if (address.length < 3 || address.length > 20) {
    return false;
  }

  const regex = /^[a-zA-Z1-9 ]*$/;

  return regex.test(address);
};

const isValidPhoneNumber = (phoneNumber) => {
  const regex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im;

  return regex.test(phoneNumber);
};

const isValidEmployeePosition = (employeePosition) => {
  if (employeePosition.length < 3 || employeePosition.length > 20) {
    return false;
  }

  const regex = /^[a-zA-Z ]*$/;

  return regex.test(employeePosition);
};

const isValidCash = (cash) => {
  const regex = /^[1-9]* ?..?.?$/;

  return regex.test(cash);
};

const isValidDescription = description => !(description.length < 5 || description.length > 120);

export {
  isValidEmail,
  isValidPassword,
  isValidFullname,
  isValidCompanyName,
  isValidVacancyName,
  isValidAddress,
  isValidPhoneNumber,
  isValidEmployeePosition,
  isValidCash,
  isValidDescription,
};
