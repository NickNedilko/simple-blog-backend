import express from "express";

import { getMe, login, register, logout } from "../../controllers/auth.js";
import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import { loginValidation, registerValidation } from "../../validations/auth.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { handleValidationErrors } from "../../middlewares/handleValidationErrors.js";


export const router = express.Router();

router.post('/register',  registerValidation, handleValidationErrors, ctrlWrapper(register));
router.post('/login',  loginValidation, handleValidationErrors, ctrlWrapper(login));
router.post('/logout', authenticate, ctrlWrapper(logout));
router.get('/me', authenticate, ctrlWrapper(getMe));