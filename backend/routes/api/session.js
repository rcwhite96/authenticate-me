const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//this checks the keys of of credential with username, email and password
//this must come before the log in
const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors,
  ];

// LOG IN
router.post(
    '/',
    validateLogin,
    asyncHandler(async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
  );

//LOG OUT
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

router.put('/:id(\\d+)', asyncHandler(async(req, res, next) => {
  const profileUpdate = await User.findByPk(req.params.id)
  const {id, username, email, hashedPassword} = req.body
  const { user } = req;
  if (!user) {
    return next(fetchNotesError('You must be logged in to edit a note'));
  }
  const profile = { id, username, email, hashedPassword };
  await profileUpdate.update(profile);
  return res.json(profileUpdate)
}))

router.get('/:id(\\d+)', asyncHandler(async(req, res, next) => {
  const profile = await User.findByPk(req.params.id)
  return res.json(profile)
}))

// RESTORE SESSION USER
router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
    }
  );

module.exports = router;
