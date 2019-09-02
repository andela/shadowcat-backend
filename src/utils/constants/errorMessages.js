export const signupErrors = {
  undefinedFirstName: 'First Name is required',
  undefinedLastName: 'Last Name is required',
  invalidFirstName: 'Input first name with only alphabets',
  invalidLastName: 'Input last name with only alphabets',
  undefinedEmail: 'Email is required',
  undefinedPhone: 'Phone number is required',
  undefinedPassword: 'Password is required',
  invalidPhone: 'Input phone number with only digits',
  invalidPassword: 'Password cannot be less than 8 characters',
  invalidEmail: 'Enter a valid email address',
  nonAndelanEmail: 'Email should be an andela email',
  existingUser: 'User already exist',
  alphaNumericPassword: 'Password should contain at least one special character, one digit and one letter',
  phoneLength: 'Phone number should be 11 digits'
};

export const signupVerifyErrors = {
  notFound: 'No pending verification found'
};

export const loginProfileErrors = {
  undefinedFirstName: 'Firstname is required',
  invalidFirstName: 'Firstname should be an Alphabet',
  undefinedLastName: 'Lastname is required',
  invalidLastName: 'Lastname should be an Alphabet',
  undefinedEmail: 'Email is required',
  undefinedPassword: 'Password is required',
  invalidPassword: 'Password cannot be less than 8 characters',
  invalidEmail: 'Enter a valid email address',
  nonAndelanEmail: 'Email should be an andela email',
  alphaNumericPassword: 'Password should be alphanumeric',
  undefinedGender: 'Gender is required',
  invalidGender: 'Gender should be an Alphabet',
  undefinedBirthday: 'Birthday is required',
  invalidBirthday: 'Birthday should be  Alphanumeric',
  undefinedPreferredLanguage: 'Preferred Language  is required',
  invalidPreferredLanguage: 'Preferred Language should be an Alphabet',
  undefinedCurrency: 'Currency  is required',
  invalidCurrency: 'Currency  should be an Alphabet',
  undefinedResidentialAddress: 'Residential address  is required',
  invalidResidentialAddress: 'Residential address should be an Alphabet',
  undefinedRole: 'role  is required',
  invalidRole: 'role should be an Alphabet',
  undefinedDepartment: 'Department  is required',
  invalidDepartment: 'Department should be an Alphabet',
  undefinedLineManager: 'Line manager  is required',
  invalidLineManager: 'Line manager should be an Alphabet',
};

export default signupErrors;
