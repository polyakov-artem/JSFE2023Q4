import { attributeKeys, classes, svgIds } from '../../../common/js/constants';
import { Car, Winner } from '../../../types/types';
import { App } from '../../app/app';
import { createDomElement } from '../create-dom-element/create-dom-element';
import { primaryBtn } from '../primary-btn/primary-btn';
import { svgElement } from '../svg-element/svg-element';

export const winnersTableContent = async (): Promise<HTMLElement> => {
  const node: HTMLElement = createDomElement({
    tag: 'tbody',
    classNames: [classes.winnersTableBody],
  });

  const winners: Winner[] = App.appModel.currentWinners;

  const carsData: (Car | undefined)[] = await Promise.all(
    winners.map(
      (winner: Winner): Promise<Car | undefined> =>
        App.appController.garageController.getCar(winner.id),
    ),
  );

  winners.forEach((winner: Winner, i: number): void => {
    if (carsData[i] === undefined) return;

    const row: HTMLElement = createDomElement({ tag: 'tr' });

    const deleteCell: HTMLElement = createDomElement({
      tag: 'th',
      classNames: [classes.winnersCell],
    });

    const numberCell: HTMLElement = createDomElement({
      tag: 'th',
      text: `${i + 1}`,
      classNames: [classes.winnersCell],
    });

    const imgCell: HTMLElement = createDomElement({ tag: 'th', classNames: [classes.winnersCell] });

    const nameCell: HTMLElement = createDomElement({
      tag: 'th',
      text: carsData[i]!.name,
      classNames: [classes.winnersCell],
    });

    const winsCell: HTMLElement = createDomElement({
      tag: 'th',
      text: `${winner.wins}`,
      classNames: [classes.winnersCell],
    });

    const timeCell: HTMLElement = createDomElement({
      tag: 'th',
      text: `${winner.time}`,
      classNames: [classes.winnersCell],
    });

    const carImg: SVGSVGElement = svgElement({
      classNames: [classes.iconCar, classes.winnersCarIcon],
      id: svgIds.car,
    });
    carImg.setAttribute('style', `color: ${carsData[i]!.color}`);

    const btnDeleteCar: HTMLButtonElement = primaryBtn({
      text: '⌦',
      classNames: [classes.btnDeleteCar],
      attr: {
        [attributeKeys.carId]: `${winner.id}`,
      },
    });

    row.append(deleteCell, numberCell, imgCell, nameCell, winsCell, timeCell);
    deleteCell.append(btnDeleteCar);
    imgCell.append(carImg);
    node.append(row);
  });

  return node;
};
