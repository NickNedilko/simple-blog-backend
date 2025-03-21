import express from 'express';
import {router as authRouter} from './routes/api/auth.js';
import dotenv from 'dotenv';
dotenv.config();


export const app = express();

app.use(express.json()); 

app.use('/api/auth', authRouter)



  app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({message,})
})  
