const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
  ];

// SIGN UP
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
  );


router.get('/', asyncHandler(async(req, res, next) => {
  // if(!user){
  //     return next(profileError('Must be logged in to view your profile.'))
  // }
  const profile = await User.findByPk(req.params.id)
  return res.json(profile)
}))

router.get('/:id(\\d+)', asyncHandler(async(req, res, next) => {

  const profile = await User.findByPk(req.params.id)
  console.log(profile)
  console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
  return res.json(profile)
}))

router.put('/:id(\\d+)', asyncHandler(async(req, res, next) => {
  const profileUpdate = await User.findByPk(req.params.id)
  const {username, email, hashedPassword} = req.body
  const profile = { username, email, userId: user.dataValues.id, hashedPassword };
  await profileUpdate.update(profile);
  return res.json(profileUpdate)
}))

module.exports = router;
