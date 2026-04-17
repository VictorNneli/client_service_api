const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required()
});

const clientSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const updateClientSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6)
});

const idParamSchema = Joi.object({
    id: Joi.number().integer().required()
});

const createRecordSchema = Joi.object({
    email: Joi.string().email().required(),
    title: Joi.string().required(),
    description: Joi.string().required()
});

const updateRecordSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string()
});

const idparamSchema = Joi.object({
    id: Joi.number().integer().required()
});

module.exports = { registerSchema, loginSchema, refreshTokenSchema, clientSchema, updateClientSchema, idParamSchema, createRecordSchema, updateRecordSchema, idparamSchema };