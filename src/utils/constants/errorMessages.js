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

export const userProfileErrors = {
  undefinedFirstName: 'Firstname is required',
  invalidFirstName: 'Firstname should be a set of alphabets with no spaces',
  undefinedLastName: 'Lastname is required',
  invalidLastName: 'Lastname should be a set of alphabets with no spaces',
  undefinedEmail: 'Email is required',
  undefinedPassword: 'Password is required',
  invalidPassword: 'Password cannot be less than 8 characters',
  invalidEmail: 'Enter a valid email address',
  nonAndelanEmail: 'Email should be an andela email',
  alphaNumericPassword: 'Password should be alphanumeric',
  undefinedGender: 'Gender is required',
  invalidGender: 'Gender should be either male or female',
  undefinedBirthday: 'Birthday is required',
  invalidBirthday: 'Birthday should be a date format dd-mm-yyyy',
  undefinedPreferredLanguage: 'Preferred Language is required',
  invalidPreferredLanguage: 'Preferred Language should be a set of alphabets with no spaces',
  undefinedCurrency: 'Currency is required',
  invalidCurrency: 'Currency should be a set of alphabets with no spaces',
  undefinedResidentialAddress: 'Residential address is required',
  invalidResidentialAddress: 'Residential address should be an address',
  undefinedRole: 'role is required',
  invalidRole: 'role can be developer,qa or maintenance',
  undefinedDepartment: 'Department is required',
  invalidDepartment: 'Department should be a set of alphabets with no spaces',
  undefinedLineManager: 'Line manager is required',
  invalidLineManager: 'Line manager should be an integer',
};

export default signupErrors;
