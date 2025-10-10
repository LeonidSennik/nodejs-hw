import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(logger);
app.use(express.json());
app.use(cors());

// Маршрути
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world!' });
});
app.use(notesRoutes);

// Обробка помилок
app.use(notFoundHandler);
app.use(errorHandler);

// Запуск сервера
const startServer = async () => {
  try {
    await connectMongoDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
