import { classes } from '../../../common/js/constants';
import { createDomElement } from '../create-dom-element/create-dom-element';
import { primaryBtn } from '../primary-btn/primary-btn';

export const garageMainControls = (): HTMLElement => {
  const node: HTMLElement = createDomElement({ classNames: [classes.garageMainControls] });

  const btnStartRaces: HTMLButtonElement = primaryBtn({
    text: 'Race',
    classNames: [classes.btnStartRaces],
  });

  const btnResetRaces: HTMLButtonElement = primaryBtn({
    text: 'Reset',
    classNames: [classes.btnResetRaces],
  });

  const btnGenerateCars: HTMLButtonElement = primaryBtn({
    text: 'Generate cars',
    classNames: [classes.btnGenerateCars],
  });

  node.append(btnStartRaces, btnResetRaces, btnGenerateCars);
  return node;
};
