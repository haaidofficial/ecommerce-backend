import express, { Application } from 'express';
import errorHandler from './middlewares/errorHandler';
import router from './routes';

const app: Application = express();

app.use(express.json());
app.use(errorHandler);
app.use('/api', router);

export default app;

