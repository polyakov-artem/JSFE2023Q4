import { classes } from '../../../common/js/constants';
import { App } from '../../app/app';
import { cars } from '../cars/cars';
import { createDomElement } from '../create-dom-element/create-dom-element';
import { pagination } from '../pagination/pagination';

export const garageInner = async (): Promise<HTMLElement> => {
  const node: HTMLElement = createDomElement({ classNames: [classes.garageInner] });

  const garageTitle: HTMLElement = createDomElement({
    tag: 'h2',
    text: `Garage (${App.appModel.carsTotal})`,
    classNames: [classes.h3, classes.garageTitle],
  });

  const garagePageNumber: HTMLElement = createDomElement({
    tag: 'h3',
    text: `Page ${App.appModel.carsPageNumber}`,
    classNames: [classes.h4, classes.garagePageNumber],
  });

  const carsElement: HTMLElement = await cars();
  const paginationElement: HTMLElement = pagination();

  node.append(garageTitle, garagePageNumber, carsElement, paginationElement);
  return node;
};
