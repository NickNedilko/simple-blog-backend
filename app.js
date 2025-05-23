import express from 'express';
import { router as authRouter } from './routes/api/auth.js';
import { router as postRouter } from './routes/api/post.js';
import { router as commentRouter } from './routes/api/comment.js';

import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();


export const app = express();

app.use(cors(
  {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
));
app.use(express.json()); 

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

app.use('/uploads', express.static('uploads'));

  app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({message,})
})  
