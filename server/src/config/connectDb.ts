import mongoose from 'mongoose';

const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log('Successfully connected to MongoDB');

    // Optional: Handling disconnection events
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB connection disconnected');
    });

    // Optional: Handling reconnection events
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB connection reconnected');
    });

    // Optional: Log MongoDB connection errors
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err.message);
    });
  } catch (err: any) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process with failure code
  }
};

export default connectDB;
