import models from '../models';
import hashPassword from '../utils/helpers/hashPassword';
import sendVerification from '../utils/helpers/sendGrid';
import generateVerificationToken from '../utils/helpers/generateVerificationToken';

const { User, Validate } = models;

/**
 * The signup controller
 * @param { object } req - The request object
 * @param { object } res - The response object
 * @return { void }
 */
export const signup = async (req, res) => {
  let {
    firstName, lastName, email, password, phone
  } = req.body;

  firstName = String(firstName).trim();

  lastName = String(lastName).trim();

  email = String(email).trim();

  password = String(password).trim();

  phone = String(phone).trim();

  password = hashPassword(password);

  const userPayload = {
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    password
  };
  const verificationToken = generateVerificationToken();
  try {
    let user = await User.create(userPayload);

    sendVerification(email, verificationToken);

    user = user.dataValues;
    const validatePayload = {
      user_id: user.user_id,
      token: verificationToken
    };
    await Validate.create(validatePayload);

    res.status(201).json({
      status: 201,
      data: {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        active: user.active,
        created_at: user.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ status: 500, error: 'Internal server error' });
  }
};
export default signup;
