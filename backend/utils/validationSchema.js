const Joi = require('joi');

const signUpBodyValidation = (body) => {
  console.log('signUpBodyValidation', body);
  const schema = Joi.object({
    name: Joi.string().required().label('name'),
    email: Joi.string().email().required().label('email'),
    password: Joi.string().min(6).required().label('password'),
  });
  return schema.validate(body);
};

const logInBodyValidation = (body) => {
  console.log('logInBodyValidation', body);
  const schema = Joi.object({
    email: Joi.string().required().label('email'),
    password: Joi.string().required().label('password'),
  });
  return schema.validate(body);
};

const refreshTokenBodyValidation = (body) => {
  console.log('Refreshing token', body);
  const schema = Joi.object({
    refreshToken: Joi.string().required().label('Refresh Token'),
  });
  return schema.validate(body);
};

module.exports = {
  signUpBodyValidation,
  logInBodyValidation,
  refreshTokenBodyValidation,
};
