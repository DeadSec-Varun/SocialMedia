import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
// import authMiddleware from './auth.js'; // Authentication middleware

import postRouter from './routes/post.js';
import userRouter from './routes/user.js';
import activityRouter from './routes/activity.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors({
  origin: 'https://varun-social.vercel.app', // frontend origin
  credentials: true                // allow cookies
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(authMiddleware);

app.use('/api/post', postRouter);
app.use('/api/user', userRouter);
app.use('/api/activity', activityRouter);

export default app;
