import { CreateDomElement } from '../../../types/types';

export const createDomElement: CreateDomElement = ({ tag = 'div', classNames, text, attr }) => {
  const element: HTMLElement = document.createElement(tag);

  if (Array.isArray(classNames)) {
    element.className = classNames.join(' ');
  }

  if (text) element.textContent = text;

  if (attr) {
    Object.keys(attr).forEach((key: string): void => {
      element.setAttribute(key, attr[key]);
    });
  }

  return element;
};
