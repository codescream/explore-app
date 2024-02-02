import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
import googleAuthRoutes from './routes/auth.js';
import { configDotenv } from 'dotenv';
// import dotenv from 'dotenv';

configDotenv();
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/auth', googleAuthRoutes);

app.get('/', (req, res) => {
  res.send('SERVER IS RUNNING');
});


// dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(`${process.env.CONNECTION_URL}`)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((err) => console.log(err.message));