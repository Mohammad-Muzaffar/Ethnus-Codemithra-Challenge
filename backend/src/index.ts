import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import transactionRoutes from './routes/transactionRoutes';
import { dbURI, port } from './config';

const app: Application = express();

app.use(cors());
app.use(express.json());

mongoose.connect(dbURI);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api', transactionRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});