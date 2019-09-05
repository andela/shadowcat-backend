/**
 * Extracts msg property of express-validator objects
 * @param { array } errors - the errors from express validator
 * @return { array } the extracted errors
 */
const pullErrors = (errors) => {
  const combinedErrors = {};
<<<<<<< HEAD
  const firstName = [];
  const lastName = [];
  const email = [];
  const phone = [];
  const password = [];
  const gender = [];
  const birthday = [];
  const preferredLanguage = [];
  const currency = [];
  const residentialAddress = [];
  const role = [];
  const department = [];
  const lineManager = [];
=======
  const firstname = [];
  const lastname = [];
  const email = [];
  const phone = [];
  const password = [];
>>>>>>> staging
  errors.forEach((error) => {
    const { msg } = error;
    const msgArray = msg.split(' ');
    const msgType = msgArray[0];
    msgArray.splice(0, 1);
    const extractedError = msgArray.join(' ');
    switch (msgType) {
      case 'firstname':
<<<<<<< HEAD
        firstName.push(extractedError);
        break;
      case 'lastname':
        lastName.push(extractedError);
=======
        firstname.push(extractedError);
        break;
      case 'lastname':
        lastname.push(extractedError);
>>>>>>> staging
        break;
      case 'email':
        email.push(extractedError);
        break;
      case 'phone':
        phone.push(extractedError);
        break;
      case 'password':
        password.push(extractedError);
        break;
<<<<<<< HEAD
      case 'gender':
        gender.push(extractedError);
        break;
      case 'birthday':
        birthday.push(extractedError);
        break;
      case 'preferredlanguage':
        preferredLanguage.push(extractedError);
        break;
      case 'currency':
        currency.push(extractedError);
        break;
      case 'residentialaddress':
        residentialAddress.push(extractedError);
        break;
      case 'role':
        role.push(extractedError);
        break;
      case 'department':
        department.push(extractedError);
        break;
      case 'linemanager':
        lineManager.push(extractedError);
        break;
      default:
    }
  });
  if (firstName.length > 0) {
    combinedErrors.firstname = firstName;
  }
  if (lastName.length > 0) {
    combinedErrors.lastname = lastName;
=======
      default:
    }
  });
  if (firstname.length > 0) {
    combinedErrors.firstname = firstname;
  }
  if (lastname.length > 0) {
    combinedErrors.lastname = lastname;
>>>>>>> staging
  }
  if (email.length > 0) {
    combinedErrors.email = email;
  }
  if (phone.length > 0) {
    combinedErrors.phone = phone;
  }
  if (password.length > 0) {
    combinedErrors.password = password;
  }
<<<<<<< HEAD
  if (gender.length > 0) {
    combinedErrors.gender = gender;
  }
  if (birthday.length > 0) {
    combinedErrors.birthday = birthday;
  }
  if (preferredLanguage.length > 0) {
    combinedErrors.preferredLanguage = preferredLanguage;
  }
  if (currency.length > 0) {
    combinedErrors.currency = currency;
  }
  if (residentialAddress.length > 0) {
    combinedErrors.residentialaddress = residentialAddress;
  }
  if (role.length > 0) {
    combinedErrors.role = role;
  }
  if (department.length > 0) {
    combinedErrors.department = department;
  }
  if (lineManager.length > 0) {
    combinedErrors.lineManager = lineManager;
  }
=======
>>>>>>> staging
  return combinedErrors;
};

export default pullErrors;
