import 'dotenv/config';

import { environment } from './environments';

import connectDB from './db';
import app from '.';

connectDB();

const PORT = environment.port || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
