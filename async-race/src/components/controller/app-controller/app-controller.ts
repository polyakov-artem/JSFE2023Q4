import { GarageController, garageController } from '../garage-controller/garage-controller';
import { WinnersController, winnersController } from '../winners-controller/winners-controller';

export class AppController {
  garageController: GarageController;

  winnersController: WinnersController;

  constructor() {
    this.garageController = garageController;
    this.winnersController = winnersController;
  }
}

export const appController: AppController = new AppController();
