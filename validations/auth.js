import { body } from 'express-validator';

export const registerValidation = [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fullName').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('avatarUrl').optional().isURL().withMessage('Avatar URL is not valid'),

];

export const loginValidation = [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]