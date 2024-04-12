import { classes } from '../../../common/js/constants';
import { createDomElement } from '../create-dom-element/create-dom-element';
import { primaryBtn } from '../primary-btn/primary-btn';

export const addCarField = (): HTMLElement => {
  const node: HTMLElement = createDomElement({
    classNames: [classes.optionsSelector, classes.addCarField],
  });

  const input: HTMLElement = createDomElement({
    tag: 'input',
    classNames: [classes.input],
    attr: { type: 'text' },
  });

  const colorSelector: HTMLElement = createDomElement({
    tag: 'input',
    classNames: [classes.colorSelector],
    attr: { type: 'color', value: '#adbe4d' },
  });

  const btn: HTMLElement = primaryBtn({
    text: 'Create',
    classNames: [classes.btnAddCar],
  });

  node.append(input, colorSelector, btn);
  return node;
};
