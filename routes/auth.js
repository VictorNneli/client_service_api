const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');
const { loginSchema, registerSchema, refreshTokenSchema } = require('../middleware/schemas');


router.post('/login', validate(loginSchema), authController.login);

router.post('/register', validate(registerSchema), authController.register);

router.post('/refresh', validate(refreshTokenSchema), authController.refreshToken);

module.exports = router;