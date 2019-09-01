/**
 * Extracts msg property of express-validator objects
 * @param { array } errors - the errors from express validator
 * @return { array } the extracted errors
 */
const pullErrors = (errors) => {
  const combinedErrors = {};
  const firstname = [];
  const lastname = [];
  const email = [];
  const password = [];
  const gender = [];
  const birthday = [];
  const preferredlanguage = [];
  const currency = [];
  const residentialaddress = [];
  const role = [];
  const department = [];
  const linemanager = [];
  errors.forEach((error) => {
    const { msg } = error;
    const msgArray = msg.split(' ');
    const msgType = msgArray[0];
    msgArray.splice(0, 1);
    const extractedError = msgArray.join(' ');
    switch (msgType) {
      case 'firstname':
        firstname.push(extractedError);
        break;
      case 'lastname':
        lastname.push(extractedError);
        break;
      case 'email':
        email.push(extractedError);
        break;
      case 'password':
        password.push(extractedError);
        break;
      case 'gender':
        gender.push(extractedError);
        break;
      case 'birthday':
        birthday.push(extractedError);
        break;
      case 'preferredlanguage':
        preferredlanguage.push(extractedError);
        break;
      case 'currency':
        currency.push(extractedError);
        break;
      case 'residentialaddress':
        residentialaddress.push(extractedError);
        break;
      case 'role':
        role.push(extractedError);
        break;
      case 'department':
        department.push(extractedError);
        break;
      case 'linemanager':
        linemanager.push(extractedError);
        break;
      default:
    }
  });
  if (firstname.length > 0) {
    combinedErrors.firstname = firstname;
  }
  if (lastname.length > 0) {
    combinedErrors.lastname = lastname;
  }
  if (email.length > 0) {
    combinedErrors.email = email;
  }
  if (password.length > 0) {
    combinedErrors.password = password;
  }
  if (gender.length > 0) {
    combinedErrors.gender = gender;
  }
  if (birthday.length > 0) {
    combinedErrors.birthday = birthday;
  }
  if (preferredlanguage.length > 0) {
    combinedErrors.preferrdlanguage = preferredlanguage;
  }
  if (currency.length > 0) {
    combinedErrors.currency = currency;
  }
  if (residentialaddress.length > 0) {
    combinedErrors.residentialaddress = residentialaddress;
  }
  if (role.length > 0) {
    combinedErrors.role = role;
  }
  if (department.length > 0) {
    combinedErrors.department = department;
  }
  if (linemanager.length > 0) {
    combinedErrors.linemanager = linemanager;
  }
  return combinedErrors;
};

export default pullErrors;
