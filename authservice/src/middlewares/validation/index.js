import { validationResult } from 'express-validator';
import { register } from './validators/rules';

const getValidator = (validatorName) => {
  const validationRules = {
    register
  };  
  return validationRules[validatorName];
}

const processValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  const errors = {};
  validationErrors.array().forEach((error) => {
    errors[error.param] = error.msg;
  });
  if (!validationErrors.isEmpty()) {
    return res.status(422).json({ status: 422, errors });
  }
  return next();
}

export default (validatorName) => {
  const rules = getValidator(validatorName);
  return [
    ...rules,
    processValidationErrors
  ];
}
