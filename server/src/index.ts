import * as Express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as expressFileUpload from 'express-fileupload';
import * as mongoSanitize from 'express-mongo-sanitize';
import { xss } from 'express-xss-sanitizer';
// import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { cityRouter, cuisineRouter, restaurantRouter, reviewRouter, userRouter, favoriteRouter } from './routes';

import { errorMiddleware } from './middlewares';

const app = Express();

app.use(cors());
app.use(Express.json());
// app.use(
//   '/api',
//   rateLimit({
//     windowMs: 60 * 60 * 1000,
//     max: 100,
//     message: 'Too many requests from this IP, please try again in an hour!',
//   }),
// );
app.use(xss());
app.use(helmet());
// Data sanitization against NoSQL query injection
// ex: "email": {"$gt": "" }
app.use(mongoSanitize());

app.use(
  expressFileUpload({
    limits: { fileSize: 50 * 1024 * 1024, files: 1 },
    abortOnLimit: true,
    createParentPath: true,
  }),
);

app.use(morgan('dev'));

app.use('/src/uploads', Express.static('src/uploads'));
app.use('/api/v1/cities', cityRouter);
app.use('/api/v1/cuisines', cuisineRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/favorites', favoriteRouter);

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

export default app;
