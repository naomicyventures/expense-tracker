import dotenv from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db/db.js';


const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors);

const PORT = process.env.PORT;

const server = () => {
  connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}


server();