import { classes } from '../../../common/js/constants';
import { Car } from '../../../types/types';
import { App } from '../../app/app';
import { AppModel } from '../../model/app-model/app-model';
import { car } from '../car/car';
import { createDomElement } from '../create-dom-element/create-dom-element';

export const cars = async (): Promise<HTMLElement> => {
  const node: HTMLElement = createDomElement({ classNames: [classes.cars, classes.garageCars] });

  const { currentCars }: AppModel = App.appModel;

  const carsData: (Car | undefined)[] = await Promise.all(
    currentCars.map(
      (currentCar: Car): Promise<Car | undefined> =>
        App.appController.garageController.getCar(currentCar.id),
    ),
  );

  carsData.forEach((data: Car | undefined): void => {
    if (!data) return;

    const carElement: HTMLElement = car(data.id, data.color, data.name);
    node.append(carElement);
  });

  return node;
};
