import express from "express";


import { ctrlWrapper } from "../../utils/ctrlWrapper.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { createComment, getAllComments, getPostComments, removeComment } from "../../controllers/comment.js";



export const router = express.Router();

router.post('/add-comment', authenticate, ctrlWrapper(createComment));
router.get('/', ctrlWrapper(getAllComments));
router.get('/:id', ctrlWrapper(getPostComments));
router.delete('/:id', authenticate, ctrlWrapper(removeComment));