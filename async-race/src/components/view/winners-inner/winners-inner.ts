import { classes } from '../../../common/js/constants';
import { App } from '../../app/app';
import { createDomElement } from '../create-dom-element/create-dom-element';
import { pagination } from '../pagination/pagination';
import { winnersTable } from '../winners-table/winners-table';

export const winnersInner = async (): Promise<HTMLElement> => {
  const node: HTMLElement = createDomElement({ classNames: [classes.winnersInner] });

  const winnersTitle: HTMLElement = createDomElement({
    tag: 'h2',
    text: `Winners (${App.appModel.winnersTotal})`,
    classNames: [classes.h3, classes.winnersTitle],
  });

  const winnersPageNumber: HTMLElement = createDomElement({
    tag: 'h3',
    text: `Page ${App.appModel.winnersPageNumber}`,
    classNames: [classes.h4, classes.winnersPageNumber],
  });

  const winnersTableElement: HTMLElement = await winnersTable();
  const paginationElement: HTMLElement = pagination();

  node.append(winnersTitle, winnersPageNumber, winnersTableElement, paginationElement);
  return node;
};
