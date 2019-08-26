export const signupErrors = {
  undefinedFirstName: 'First Name is required',
  undefinedLastName: 'Last Name is required',
  invalidFirstName: 'First name can only be alphabets',
  invalidLastName: 'Last name can only be alphabets',
  undefinedEmail: 'Email is required',
  undefinedPhone: 'Phone number is required',
  undefinedPassword: 'Password is required',
  invalidPhone: 'Phone number not valid',
  invalidPassword: 'Password cannot be less than 8 characters',
  invalidEmail: 'Email provided is not valid',
  nonAndelanEmail: 'Andela email not provided',
  existingUser: 'User already exist',
  alphaNumericPassword: 'Password should contain no special characters with at least one digit and one letter'
};

export const signupVerifyErrors = {
  notFound: 'No pending verification found'
};

export default signupErrors;
