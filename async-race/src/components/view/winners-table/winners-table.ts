import { classes, sort } from '../../../common/js/constants';
import { BtnSortBy } from '../btn-sort-by/btn-sort-by';
import { createDomElement } from '../create-dom-element/create-dom-element';
import { winnersTableContent } from '../winners-table-content/winners-table-content';

export const winnersTable = async (): Promise<HTMLElement> => {
  const node: HTMLElement = createDomElement({ tag: 'table', classNames: [classes.winnersTable] });
  const thead: HTMLElement = createDomElement({ tag: 'thead' });

  const winnersTableHeader: HTMLElement = createDomElement({
    tag: 'tr',
    classNames: [classes.winnersTableHeader],
  });

  const deleteHeader: HTMLElement = createDomElement({
    tag: 'th',
    text: 'Delete',
    classNames: [classes.winnersCell],
  });

  const numberHeader: HTMLElement = createDomElement({
    tag: 'th',
    text: 'Number',
    classNames: [classes.winnersCell],
  });

  const imgHeader: HTMLElement = createDomElement({
    tag: 'th',
    text: 'Car',
    classNames: [classes.winnersCell],
  });

  const nameHeader: HTMLElement = createDomElement({
    tag: 'th',
    text: 'Name',
    classNames: [classes.winnersCell],
  });

  const winsHeader: HTMLElement = createDomElement({
    tag: 'th',
    text: 'Wins',
    classNames: [classes.winnersCell],
  });

  const timeHeader: HTMLElement = createDomElement({
    tag: 'th',
    text: 'Best time (seconds)',
    classNames: [classes.winnersCell],
  });

  const btnSortByTime: HTMLButtonElement = new BtnSortBy(sort.time, [
    classes.winnersSortBtn,
  ]).getNode();

  const btnSortByWins: HTMLButtonElement = new BtnSortBy(sort.wins, [
    classes.winnersSortBtn,
  ]).getNode();

  thead.append(winnersTableHeader);
  winnersTableHeader.append(
    deleteHeader,
    numberHeader,
    imgHeader,
    nameHeader,
    winsHeader,
    timeHeader,
  );
  winsHeader.append(btnSortByWins);
  timeHeader.append(btnSortByTime);

  const tbody: HTMLElement = await winnersTableContent();
  node.append(thead, tbody);

  return node;
};
