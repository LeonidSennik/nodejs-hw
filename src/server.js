import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());
app.use(pino());

// Реалізовані маршрути
app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;

  res.status(200).json({
    message: 'Retrieved note with ID: id_param',
    id_param: noteId,
  });
});

// Тестовий маршрут для помилки
app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

// Обробка нерозпізнаних маршрутів
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware для обробки помилок
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
