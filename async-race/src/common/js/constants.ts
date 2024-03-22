import { Dictionary } from '../../types/types';

export const classes: Dictionary = {};

export const classSelectors: Dictionary = {};

Object.entries(classes).forEach((entry: [string, string]): void => {
  classSelectors[entry[0]] = '.' + entry[1];
});
