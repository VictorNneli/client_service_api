const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required()
});

module.exports = { loginSchema, refreshTokenSchema };