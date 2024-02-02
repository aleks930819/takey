import * as Express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as expressFileUpload from 'express-fileupload';

import { cityRouter, cuisineRouter, restaurantRouter } from './routes';

const app = Express();

app.use(cors());
app.use(Express.json());
app.use(
  expressFileUpload({
    limits: { fileSize: 50 * 1024 * 1024, files: 1 },
    abortOnLimit: true,
    createParentPath: true
  })
);

app.use(morgan('dev'));

app.use('/src/uploads', Express.static('src/uploads'));
app.use('/api/v1/cities', cityRouter);
app.use('/api/v1/cuisines', cuisineRouter);
app.use('/api/v1/restaurants', restaurantRouter);

export default app;
