import { createTss } from 'tss-react';
import { theme } from './theme';

function useContext() {
  return { theme };
}

export const { tss } = createTss({ useContext });

export const useStyles = tss.create({});
