import { classes } from '../../../common/js/constants';
import { createDomElement } from '../create-dom-element/create-dom-element';
import { primaryBtn } from '../primary-btn/primary-btn';

export const updateCarField = (): HTMLElement => {
  const node: HTMLElement = createDomElement({
    classNames: [classes.optionsSelector, classes.updateCarField],
  });

  const input: HTMLElement = createDomElement({
    tag: 'input',
    classNames: [classes.input],
    attr: { type: 'text', disabled: 'true' },
  });

  const colorSelector: HTMLElement = createDomElement({
    tag: 'input',
    classNames: [classes.colorSelector],
    attr: { type: 'color', disabled: 'true', value: '#adbe4d' },
  });

  const btn: HTMLElement = primaryBtn({
    text: 'Update',
    disabled: true,
    classNames: [classes.btnUpdateCar],
  });

  node.append(input, colorSelector, btn);
  return node;
};
