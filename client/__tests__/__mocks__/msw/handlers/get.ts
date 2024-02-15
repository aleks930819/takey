import { rest } from 'msw';

import { mockRestaraunts } from '@/__tests__/__mocks__/msw/mock-data';

const API = 'http://localhost:3000/api/v1';

export const getHandlers = [rest.get(`${API}/restaurants`, (req, res, ctx) => res(ctx.json(mockRestaraunts)))];
