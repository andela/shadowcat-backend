import { check, validationResult } from 'express-validator';
import pullErrors from '../utils/helpers/pullErrors';
import { userProfileErrors } from '../utils/constants/errorMessages';

const profileValidation = [
  check('firstname')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`firstname ${userProfileErrors.undefinedFirstName}`)
    .isAlpha()
    .withMessage(`firstname ${userProfileErrors.invalidFirstName}`),
  check('lastname')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`lastname ${userProfileErrors.undefinedLastName}`)
    .isAlpha()
    .withMessage(`lastname ${userProfileErrors.invalidLastName}`),
  check('email')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`email ${userProfileErrors.undefinedEmail}`)
    .isEmail()
    .withMessage(`email ${userProfileErrors.invalidEmail}`)
    .matches(/@andela.com$/)
    .withMessage(`email ${userProfileErrors.nonAndelanEmail}`),
  check('password')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`password ${userProfileErrors.undefinedPassword}`),
  check('gender')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`gender ${userProfileErrors.undefinedGender}`)
    .isAlpha()
    .withMessage(`gender ${userProfileErrors.invalidGender}`),
  check('birthday')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`birthday ${userProfileErrors.undefinedBirthday}`)
    .isAscii()
    .withMessage(`birthday ${userProfileErrors.invalidBirthday}`),
  check('preferredlanguage')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`preferredlanguage ${userProfileErrors.undefinedPreferredLanguage}`)
    .isAlpha()
    .withMessage(`preferredlanguage ${userProfileErrors.invalidPreferredLanguage}`),
  check('currency')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`currency ${userProfileErrors.undefinedCurrency}`)
    .isAlpha()
    .withMessage(`currency ${userProfileErrors.invalidCurrency}`),
  check('residentialaddress')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`residentialaddress ${userProfileErrors.undefinedResidentialAddress}`)
    .isAlpha()
    .withMessage(`residentialaddress ${userProfileErrors.invalidResidentialAddress}`),
  check('role')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`role ${userProfileErrors.undefinedRole}`)
    .matches(/^.*(develop|qa|maintenance).*$$/)
    .withMessage(`role ${userProfileErrors.invalidRole}`),
  check('department')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`department ${userProfileErrors.undefinedDepartment}`)
    .isAlpha()
    .withMessage(`department ${userProfileErrors.invalidDepartment}`),
  check('linemanager')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage(`linemanager ${userProfileErrors.undefinedLineManager}`)
    .isNumeric()
    .withMessage(`linemanager ${userProfileErrors.invalidLineManager}`),
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
