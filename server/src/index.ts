import 'dotenv/config';

import * as Express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';

const app = Express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(Express.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

export default app;
