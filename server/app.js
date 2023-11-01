import dotenv from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db/db.js';
import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const __dirname = dirname(fileURLToPath(import.meta.url));

const loadRoutes = async () => {
  try {
    const routeFiles = await readdir(`${__dirname}/routes`);
    const routeModules = routeFiles
      .filter(route => route.endsWith('.js'))
      .map(async route => {
        const { default: routeModule } = await import(`./routes/${route}`);
        return routeModule;
      });

    const resolvedRouteModules = await Promise.all(routeModules);

    resolvedRouteModules.forEach(routeModule => {
      app.use('/api/v1', routeModule);
    });
  } catch (error) {
    console.error('Error loading routes:', error);
  }
};

const startServer = async () => {
  try {
    await connectDB();
    await loadRoutes();
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
  }
};

startServer();
