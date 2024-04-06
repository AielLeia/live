import { type ClassValue, clsx } from 'clsx';
import stc from 'string-to-color';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToColor(str: string) {
  return stc(str);
}
