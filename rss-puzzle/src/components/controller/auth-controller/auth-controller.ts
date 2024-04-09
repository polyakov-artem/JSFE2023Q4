import {
  AUTH_DATA_KEY,
  INVALID_CHARS,
  INVALID_FIRST_LETTER,
  NAME_INPUT_MIN_LENGTH,
  SURNAME_INPUT_MIN_LENGTH,
} from '../../../common/js/constants';
import { AuthData, UserData } from '../../../types/types';
import { App } from '../../app/app';

export class AuthController {
  validateInput(inputText: string = '', minLength: number = 3): string {
    if (/[^a-zA-Z-]/g.test(inputText)) return INVALID_CHARS;
    if (inputText.length < minLength) return `The length must be at least ${minLength} characters`;
    if (inputText[0] !== inputText[0].toUpperCase()) return INVALID_FIRST_LETTER;
    return '';
  }

  autoLogin(): void {
    const authData: AuthData | null = App.appController.storage.getData<AuthData>(AUTH_DATA_KEY);
    if (!authData) {
      this.logout();
      return;
    }

    const { name, surname }: { name: string | undefined; surname: string | undefined } = authData;

    const nameError: string = this.validateInput(name, NAME_INPUT_MIN_LENGTH);
    const surnameError: string = this.validateInput(surname, SURNAME_INPUT_MIN_LENGTH);

    if (nameError || surnameError) {
      this.logout();
      return;
    }

    this.login(name, surname);
  }

  login(name: string, surname: string): void {
    const userData: UserData | undefined = App.appController.server.login(name, surname);
    if (!userData) {
      return;
    }
    App.appModel.userData = userData;
    this.saveAuthData(name, surname);
    App.appView.page.startPage.redraw();
  }

  saveAuthData(name: string, surname: string): void {
    App.appController.storage.saveData<AuthData>(AUTH_DATA_KEY, {
      name,
      surname,
    });
  }

  deleteAuthData(): void {
    App.appController.storage.removeData(AUTH_DATA_KEY);
  }

  logout(): void {
    this.deleteAuthData();
    App.appView.page.loginPage.redraw();
  }
}
