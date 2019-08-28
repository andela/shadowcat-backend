/**
 * Extracts msg property of express-validator objects
 * @param { array } errors - the errors from express validator
 * @return { array } the extracted errors
 */
const pullErrors = (errors) => {
  const combinedErrors = {};
  const email = [];
  const password = [];
  errors.forEach((error) => {
    const { msg } = error;
    const msgArray = msg.split(' ');
    const msgType = msgArray[0];
    msgArray.splice(0, 1);
    const extractedError = msgArray.join(' ');
    switch (msgType) {
      case 'email':
        email.push(extractedError);
        break;
      case 'password':
        password.push(extractedError);
        break;
      default:
    }
  });
  if (email.length > 0) {
    combinedErrors.email = email;
  }
  if (password.length > 0) {
    combinedErrors.password = password;
  }
  return combinedErrors;
};

export default pullErrors;
