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
  const phone = [];
  const password = [];
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
      case 'phone':
        phone.push(extractedError);
        break;
      case 'password':
        password.push(extractedError);
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
  if (phone.length > 0) {
    combinedErrors.phone = phone;
  }
  if (password.length > 0) {
    combinedErrors.password = password;
  }
  return combinedErrors;
};

export default pullErrors;
