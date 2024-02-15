/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`
// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { server } from '@/__tests__/__mocks__/msw/server';

beforeAll(() => {
  // msw: Establish API mocking before all tests.
  server.listen();
});

afterEach(() => {
  // msw: Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  server.resetHandlers();
});

afterAll(() => {
  // msw: Clean up after the tests are finished.
  server.close();
});
