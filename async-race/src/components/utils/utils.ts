import {
  CloneObj,
  DisableElement,
  EnableElement,
  GetRandom,
  IsEmptyObj,
  IsObj,
  ShuffleArray,
} from '../../types/types';

export const shuffleArray: ShuffleArray = (array) => {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

// includes min and max
export const getRandom: GetRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const cloneObj: CloneObj = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const isEmptyObj: IsEmptyObj = (obj) => {
  return Object.getOwnPropertyNames(obj).length === 0;
};

export const isObject: IsObj = (value) => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

export const generateHEXColor = (): string => {
  const hexValues: (string | number)[] = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
  ];
  let hex: string = '#';

  for (let i = 0; i < 6; i += 1) {
    const index: number = Math.floor(Math.random() * hexValues.length);
    hex += hexValues[index];
  }

  return hex;
};

export const dispatchCustomEvent = (name: string, data?: unknown): void => {
  document.dispatchEvent(new CustomEvent(name, { detail: data }));
};

export const disableElement: DisableElement = (element: HTMLElement): void => {
  element.setAttribute('disabled', 'true');
};

export const enableElement: EnableElement = (element: HTMLElement): void => {
  element.removeAttribute('disabled');
};
