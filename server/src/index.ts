import * as Express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';

import { cityRouter, cuisineRouter } from './routes';

const app = Express();

app.use(cors());
app.use(Express.json());

app.use(morgan('dev'));

app.use('/api/v1/cities', cityRouter);
app.use('/api/v1/cuisines', cuisineRouter);

export default app;
