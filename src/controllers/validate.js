import models from '../models';

const { User, Validate } = models;

/**
 * Verify signup token controller
 * @param { object } req - The request object
 * @param { object } res - The response object
 * @return { void }
 */
export const validate = async (req, res) => {
  const { token } = req.params;
  const validateEntry = await Validate.findOne({ where: { token } });

  if (validateEntry) {
    await User.update(
      { active: true },
      { returning: true, where: { userId: validateEntry.userId } }
    );
    res.status(201).json({ status: 201, data: 'Registration complete' });
  } else {
    res.status(404).json({ status: 404, error: 'entry not found' });
  }
};

export default validate;
