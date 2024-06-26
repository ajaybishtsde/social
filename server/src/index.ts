import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import AppError from './utils/appError';
import { globalErrorHandler } from './utils/globalErrorHandler';
import connectDB from './config/connectDb';
import userRoutes from './routes/user';
import bodyParser = require('body-parser');
import authRoutes from './routes/auth';
// Load environment variables from .env file
const corsOptions = {
  origin: '*',
};
const app = express();
app.use(cors(corsOptions));
console.log("process.env.MONGODB_URI",process.env.MONGODB_URI)
const uri = process.env.MONGODB_URI || 'mongodb+srv://ajaybishtsde:ajaybishtsde@cluster0.561f4kq.mongodb.net/social';
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// Ensure the database connection is established before starting the server
connectDB(uri)
  .then(() => {
    const port = process.env.PORT || 3001;

    app.get('/', (req, res) => {
      res.json({
        status: true,
        message: 'Server working properly',
      });
    });
    app.use('/user', userRoutes);
    app.use('/auth', authRoutes);
    app.all('*', (req, res, next) => {
      next(new AppError(`Requested URL ${req.originalUrl} is not found`, 404));
    });

    app.use(globalErrorHandler);

    app.listen(port, () => {
      console.log(`App is listening at ${port}`);
    });

    process.on('unhandledRejection', err => {
      if (err instanceof Error) {
        console.log(err.name, err.message);
      }
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
