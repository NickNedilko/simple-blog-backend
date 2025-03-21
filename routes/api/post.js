import express from "express";


import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import { authenticate } from "../../middlewares/authenticate.js";

import { postValidation } from "../../validations/post.js";
import { createPost, getAllPosts, getOnePost, removePost, updatePost, uploadImage } from "../../controllers/post.js";
import { upload } from "../../middlewares/multer.js";
import { handleValidationErrors } from "../../middlewares/handleValidationErrors.js";


export const router = express.Router();


router.post('/', authenticate, postValidation, handleValidationErrors, ctrlWrapper(createPost));
router.get('/', ctrlWrapper(getAllPosts));
router.get('/:id', ctrlWrapper(getOnePost));
router.delete('/:id', authenticate, ctrlWrapper(removePost));
router.patch('/:id', authenticate, postValidation, handleValidationErrors, ctrlWrapper(updatePost));
router.post('/:id', authenticate, upload.single('imageUrl'), ctrlWrapper(uploadImage));