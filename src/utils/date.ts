import { formatDistanceToNow } from 'date-fns';

export const formatDuration = (date: Date): string => {
  const result = formatDistanceToNow(new Date(date), {
    addSuffix: false,
    includeSeconds: false,
  })
    .replace('about ', '')
    .replace(/minutes?/, 'm')
    .replace(/hours?/, 'h')
    .replace(/days?/, 'd')
    .replace(/months?/, 'mo')
    .replace(/years?/, 'y')
    .replace(' ', '');
  if (result.includes('lessthan')) {
    return 'just now';
  }
  return result;
};
