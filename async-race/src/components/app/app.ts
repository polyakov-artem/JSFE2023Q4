import { AppController, appController } from '../controller/app-controller/app-controller';
import { AppModel, appModel } from '../model/app-model/app-model';

export class App {
  static appController: AppController = appController;

  static appModel: AppModel = appModel;

  constructor() {
    this.init();
  }

  init(): void {
    const { garageController, winnersController } = App.appController;
    winnersController.updateCurrentWinners();
    garageController.updateCurrentCars();
  }
}
