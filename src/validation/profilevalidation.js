import { check, validationResult } from 'express-validator';
import pullErrors from '../utils/helpers/pullErrors';
import { loginProfileErrors } from '../utils/constants/errorMessages';

const profileValidation = [
  check('firstname')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`firstname ${loginProfileErrors.undefinedFirstName}`)
    .isAlpha()
    .withMessage(`firstname ${loginProfileErrors.invalidFirstName}`),
  check('lastname')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`lastname ${loginProfileErrors.undefinedLastName}`)
    .isAlpha()
    .withMessage(`lastname ${loginProfileErrors.invalidLastName}`),
  check('email')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`email ${loginProfileErrors.undefinedEmail}`)
    .isEmail()
    .withMessage(`email ${loginProfileErrors.invalidEmail}`)
    .matches(/@andela.com$/)
    .withMessage(`email ${loginProfileErrors.nonAndelanEmail}`),
  check('password')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`password ${loginProfileErrors.undefinedPassword}`),
  check('gender')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`gender ${loginProfileErrors.undefinedGender}`)
    .isAlpha()
    .withMessage(`gender ${loginProfileErrors.invalidGender}`),
  check('birthday')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`birthday ${loginProfileErrors.undefinedBirthday}`)
    .isAscii()
    .withMessage(`birthday ${loginProfileErrors.invalidBirthday}`),
  check('preferredlanguage')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`preferredlanguage ${loginProfileErrors.undefinedPreferredLanguage}`)
    .isAlpha()
    .withMessage(`preferredlanguage ${loginProfileErrors.invalidPreferredLanguage}`),
  check('currency')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`currency ${loginProfileErrors.undefinedCurrency}`)
    .isAlpha()
    .withMessage(`currency ${loginProfileErrors.invalidCurrency}`),
  check('residentialaddress')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`residentialaddress ${loginProfileErrors.undefinedResidentialAddress}`)
    .isAlpha()
    .withMessage(`residentialaddress ${loginProfileErrors.invalidResidentialAddress}`),
  check('role')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`role ${loginProfileErrors.undefinedRole}`)
    .isAlpha()
    .withMessage(`role ${loginProfileErrors.invalidRole}`),
  check('department')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`department ${loginProfileErrors.undefinedDepartment}`)
    .isAlpha()
    .withMessage(`department ${loginProfileErrors.invalidDepartment}`),
  check('linemanager')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`linemanager ${loginProfileErrors.undefinedLineManager}`)
    .isAlpha()
    .withMessage(`linemanager ${loginProfileErrors.invalidLineManager}`),
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
