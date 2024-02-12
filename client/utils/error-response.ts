import { AxiosError } from 'axios';

/**
 * Generates an error response object based on the provided error.
 * If the error is an instance of Error, it returns an object with the error message.
 * Otherwise, it returns an object with a generic error message.
 * @param error - The error object to generate the response from.
 * @returns The error response object.
 */
const errorResponse = (error: unknown) => {
  if (error instanceof AxiosError) {
    return {
      message: error.response?.data.message,
    };
  } else if (error instanceof Error) {
    return {
      message: error.message,
    };
  } else {
    return {
      message: 'An error occurred',
    };
  }
};

export default errorResponse;
