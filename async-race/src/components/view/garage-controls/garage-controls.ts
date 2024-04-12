import { classes } from '../../../common/js/constants';
import { addCarField } from '../add-car-field/add-car-field';
import { createDomElement } from '../create-dom-element/create-dom-element';
import { updateCarField } from '../update-car-field/update-car-field';

export const garageControls = (): HTMLElement => {
  const node: HTMLElement = createDomElement({ classNames: [classes.garageControls] });
  node.append(addCarField(), updateCarField());
  return node;
};
