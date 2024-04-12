import { AppController, appController } from '../controller/app-controller/app-controller';
import { AppModel, appModel } from '../model/app-model/app-model';
import { AppView, appView } from '../view/app-view/app-view';

export class App {
  static appController: AppController = appController;

  static appModel: AppModel = appModel;

  static appView: AppView = appView;

  constructor() {
    this.init();
  }

  init(): void {
    const { garageController, winnersController } = App.appController;
    winnersController.updateCurrentWinners();
    garageController.updateCurrentCars();
  }
}
