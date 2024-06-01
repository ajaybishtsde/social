import express from 'express';
import dotenv from 'dotenv';
import AppError from './utils/appError';
import { globalErrorHandler } from './utils/globalErrorHandler';
import connectDB from './database/mongoConnection';

// Load environment variables from .env file
dotenv.config();

const app = express();
const uri = process.env.MONGODB_URI || '';

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

    app.all('*', (req, res, next) => {
      next(new AppError(`Requested URL ${req.originalUrl} is not found`, 404));
    });

    app.use(globalErrorHandler);

    app.listen(port, () => {
      console.log(`App is listening at http://localhost:${port}`);
    });

    process.on('unhandledRejection', err => {
      if (err instanceof Error) {
        console.log(err.name, err.message);
      }
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process if the database connection fails
  });
