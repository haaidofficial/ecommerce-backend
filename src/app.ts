import express, { Application } from 'express';
import errorHandler from './middlewares/errorHandler';
import router from './routes';
import path from 'path';

const app: Application = express();

app.use(express.json());
app.use('/media', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api', router);
app.use(errorHandler);


export default app;

