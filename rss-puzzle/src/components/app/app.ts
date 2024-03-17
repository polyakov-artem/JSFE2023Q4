import { AppModel } from '../app-model/app-model';
import { AppView } from '../view/app-view/app-view';
import '~common-css/normalize.css';
import '~common-css/style.css';

export class App {
  constructor() {
    this.init();
  }
  static appModel = new AppModel();
  static appView = new AppView();
  init() {
    App.appView.init();
    App.appView.page.loginPage.redraw();
  }
}
