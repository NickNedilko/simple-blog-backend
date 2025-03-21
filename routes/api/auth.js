import express from "express";

import { getMe, login, register } from "../../controllers/auth.js";
import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import { registerValidation } from "../../validations/auth.js";
import { authenticate } from "../../middlewares/authenticate.js";


export const router = express.Router();

router.post('/register', registerValidation, ctrlWrapper(register));
router.post('/login', ctrlWrapper(login));
router.get('/me', authenticate, ctrlWrapper(getMe));