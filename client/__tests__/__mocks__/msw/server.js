import { setupServer } from 'msw/node';
import { getHandlers } from './handlers';

const server = setupServer(...getHandlers);

export { server };
