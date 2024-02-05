import { format } from 'date-fns';

/**
 * Formats a date into a string with the name of the day and the name of the month.
 * @param date The date to be formatted.
 * @returns The formatted date string.
 */
const formatDate = (date: Date): string => {
  return format(date, 'EEEE, MMMM do yyyy');
};

export default formatDate;
