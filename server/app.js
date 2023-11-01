import dotenv from 'dotenv/config';
import express from 'express';

const app = express();

const PORT = process.env.PORT;

const server = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}


server();