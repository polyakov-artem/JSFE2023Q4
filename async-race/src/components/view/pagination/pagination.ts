import { classes } from '../../../common/js/constants';
import { createDomElement } from '../create-dom-element/create-dom-element';
import { primaryBtn } from '../primary-btn/primary-btn';

export const pagination = (): HTMLElement => {
  const node: HTMLElement = createDomElement({
    classNames: [classes.pagination],
  });

  const btnNextWinners: HTMLButtonElement = primaryBtn({
    text: 'Next',
    classNames: [classes.paginationNextBtn],
  });

  const btnPrevWinners: HTMLButtonElement = primaryBtn({
    text: 'Previous',
    classNames: [classes.paginationPrevBtn],
  });

  node.append(btnPrevWinners, btnNextWinners);
  return node;
};
