import * as Express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as expressFileUpload from 'express-fileupload';

import { cityRouter, cuisineRouter, restaurantRouter, reviewRouter, userRouter } from './routes';

import { RESPONSE_STATUS } from './constants';

const app = Express();

// TODO: Add domain of the client app to the whitelist
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
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  res.status(404).json({
    status: RESPONSE_STATUS.FAIL,
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

export default app;
