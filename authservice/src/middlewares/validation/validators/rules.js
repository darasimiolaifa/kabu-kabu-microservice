import { check, body } from 'express-validator';

const nameRegex = /^[A-z\-']{2,250}$/;
const userType = /^passenger|driver$/;

export const register = [
  check('firstName', 'firstname should be made up of alphabeths between 2 and 250 characters long.')
    .matches(nameRegex)
    .trim(),
  check('lastName', 'lastname should be made up of alphabeths between 2 and 250 characters long.')
    .matches(nameRegex)
    .trim(),
  check('email', 'Please enter a valid email address.')
    .isEmail()
    .normalizeEmail()
    .not()
    .isEmpty(),
  check('password', 'Please enter a valid password of at least 8 characters long.')
    .isLength({ min: 8 })
    .not()
    .isEmpty(),
  check('userType', 'Please enter a valid user type')
    .matches(userType)
    .trim()
    .not()
    .isEmpty(),
  check('phone_number', 'Please enter a valid phone number')
    .isNumeric()
    .trim()
    .not()
    .isEmpty()
];