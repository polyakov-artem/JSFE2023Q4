import { HINT_DATA_KEY } from '../../../common/js/constants';
import { App } from '../../app/app';

export class HintController {
  saveState(name: string, isChecked: boolean): void {
    App.appController.storage.saveData(this.generateKey(name), isChecked);
  }

  getState(name: string): boolean {
    let isChecked: boolean | null = App.appController.storage.getData(this.generateKey(name));

    if (isChecked === null) {
      isChecked = true;
      this.saveState(name, isChecked);
    }

    return isChecked;
  }

  generateKey(name: string): string {
    return `${name}_${HINT_DATA_KEY}`;
  }

  deleteState(name: string): void {
    App.appController.storage.removeData(this.generateKey(name));
  }
}
