/**
 * Extracts msg property of express-validator objects
 * @param { array } errors - the errors from express validator
 * @return { array } the extracted errors
 */
const pullErrors = (errors) => {
  const combinedErrors = [];
  errors.forEach((error) => {
    const { msg } = error;
    combinedErrors.push(msg);
  });
  return combinedErrors;
};

export default pullErrors;
