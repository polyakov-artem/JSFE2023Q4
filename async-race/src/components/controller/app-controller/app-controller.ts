import {
  GarageController,
  garageController as gController,
} from '../garage-controller/garage-controller';
import {
  WinnersController,
  winnersController as wController,
} from '../winners-controller/winners-controller';

export class AppController {
  constructor(
    readonly garageController: GarageController,
    readonly winnersController: WinnersController,
  ) {}
}

export const appController: AppController = new AppController(gController, wController);
