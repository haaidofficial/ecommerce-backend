import express, { Application } from 'express';
import errorHandler from './middlewares/errorHandler';
import router from './routes';

const app: Application = express();

app.use(express.json());
app.use('/api', router);
app.use(errorHandler);


export default app;

