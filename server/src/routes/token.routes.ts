import * as Express from 'express';

import { authCotnroller } from '../controllers';

const router = Express.Router();

router.get('/', authCotnroller.refreshAuthToken);

export default router;
