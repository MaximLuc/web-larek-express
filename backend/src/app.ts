import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors as celebrateErrors } from 'celebrate';
import NotFoundError from './errors/not-found-error';
import errorHandler from './middlewares/error-handler';
import routes from './routes/index';
import { errorLogger, requestLogger } from './middlewares/logger';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/weblarek';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(requestLogger);
app.use(routes);

app.use((_req, _res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);

app.use(celebrateErrors());

app.use(errorHandler);
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Mongo connected');
    app.listen(3000, () => {
      console.log(`Server is running on port ${3000}`);
    });
  })
  .catch((err) => {
    console.error('Mongo connection error', err);
    process.exit(1);
  });
