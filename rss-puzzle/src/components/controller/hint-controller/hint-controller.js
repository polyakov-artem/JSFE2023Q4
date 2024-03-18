import { HINT_DATA_KEY } from '../../../common/js/constants.js';
import { App } from '../../app/app.js';

export class HintController {
  saveState(name, isChecked) {
    App.appController.storage.saveData(this.generateKey(name), isChecked);
  }

  getState(name) {
    let isChecked = App.appController.storage.getData(this.generateKey(name));

    if (isChecked === null) {
      isChecked = true;
      this.saveState(name, isChecked);
    }

    return isChecked;
  }

  generateKey(name) {
    return `${name}_${HINT_DATA_KEY}`;
  }

  deleteState(name) {
    App.appController.storage.removeData(this.generateKey(name));
  }
}
