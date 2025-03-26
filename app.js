import express from 'express';
import { router as authRouter } from './routes/api/auth.js';
import { router as postRouter } from './routes/api/post.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();


export const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://simple-blog-alpha-green.vercel.app/'] 
}));
app.use(express.json()); 

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

app.use('/uploads', express.static('uploads'));

  app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({message,})
})  
