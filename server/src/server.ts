import { environment } from './environments';

import app from '.';

const PORT = environment.port || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
