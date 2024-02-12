import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names into a single string.
 *
 * @param inputs - The class names to be combined.
 * @returns The combined class names as a string.
 *
 * @example
 * import { cn } from '@/lib/utils';
 *
 * const Component = (className) => {
 *  return <div className={cn('text-black',className)} />;
 * };
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
