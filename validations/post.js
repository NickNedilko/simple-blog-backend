import { body } from "express-validator";


export const postValidation = [
    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body('text').isLength({ min: 3 }).withMessage('Text must be at least 3 characters long'),
    body('tags').optional().isArray().withMessage('Tags must be an array'),
    body('imageUrl').optional().isURL({
    protocols: ['http', 'https'],
    host_whitelist: ['localhost', '127.0.0.1', 'res.cloudinary.com'],
    require_protocol: true
  }).withMessage('Image URL is not valid'),
]