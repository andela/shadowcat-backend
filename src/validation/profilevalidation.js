import { check, validationResult } from 'express-validator';
import pullErrors from '../utils/helpers/pullErrors';
import { Errors } from '../utils/constants/errorMessages';

const profileValidation = [
  check('firstname')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`firstname ${Errors.undefinedFirstName}`)
    .isAlpha()
    .withMessage(`firstname ${Errors.invalidFirstName}`),
  check('lastname')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`lastname ${Errors.undefinedLastName}`)
    .isAlpha()
    .withMessage(`lastname ${Errors.invalidLastName}`),
  check('email')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`email ${Errors.undefinedEmail}`)
    .isEmail()
    .withMessage(`email ${Errors.invalidEmail}`)
    .matches(/@andela.com$/)
    .withMessage(`email ${Errors.nonAndelanEmail}`),
  check('password')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`password ${Errors.undefinedPassword}`),
  check('gender')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`gender ${Errors.undefinedGender}`)
    .isAlpha()
    .withMessage(`gender ${Errors.invalidGender}`),
  check('birthday')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`birthday ${Errors.undefinedBirthday}`)
    .isAscii()
    .withMessage(`birthday ${Errors.invalidBirthday}`),
  check('preferredlanguage')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`preferredlanguage ${Errors.undefinedPreferredLanguage}`)
    .isAlpha()
    .withMessage(`preferredlanguage ${Errors.invalidPreferredLanguage}`),
  check('currency')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`currency ${Errors.undefinedCurrency}`)
    .isAlpha()
    .withMessage(`currency ${Errors.invalidCurrency}`),
  check('residentialaddress')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`residentialaddress ${Errors.undefinedResidentialAddress}`)
    .isAlpha()
    .withMessage(`residentialaddress ${Errors.invalidResidentialAddress}`),
  check('role')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`role ${Errors.undefinedRole}`)
    .isAlpha()
    .withMessage(`role ${Errors.invalidRole}`),
  check('department')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`department ${Errors.undefinedDepartment}`)
    .isAlpha()
    .withMessage(`department ${Errors.invalidDepartment}`),
  check('linemanager')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`linemanager ${Errors.undefinedLineManager}`)
    .isAlpha()
    .withMessage(`linemanager ${Errors.invalidLineManager}`),
  async (req, res, next) => {
    const { errors } = validationResult(req);
    if (errors.length) {
      const pulledErrors = pullErrors(errors);
      return res.status(400).json({
        status: 400,
        error: pulledErrors
      });
    }
    return next();
  }
];

export default profileValidation;
