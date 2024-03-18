import {
  AUTH_DATA_KEY,
  INVALID_CHARS,
  INVALID_FIRST_LETTER,
  INVALID_NAME_LENGTH,
  INVALID_SURNAME_LENGTH,
} from '../../../common/js/constants';
import { AuthData, UserData } from '../../../types/types';
import { App } from '../../app/app';

export class AuthController {
  validateName(name: string = ''): string {
    if (/[^a-zA-Z-]/g.test(name)) return INVALID_CHARS;
    if (name.length < 3) return INVALID_NAME_LENGTH;
    if (name[0] !== name[0].toUpperCase()) return INVALID_FIRST_LETTER;
    return '';
  }

  validateSurname(surname: string = ''): string {
    if (/[^a-zA-Z-]/g.test(surname)) return INVALID_CHARS;
    if (surname.length < 4) return INVALID_SURNAME_LENGTH;
    if (surname[0] !== surname[0].toUpperCase()) return INVALID_FIRST_LETTER;
    return '';
  }

  autoLogin(): void {
    const authData: AuthData | null = App.appController.storage.getData<AuthData>(AUTH_DATA_KEY);
    if (!authData) {
      this.logout();
      return;
    }

    const { name, surname }: { name: string | undefined; surname: string | undefined } = authData;

    const nameError: string = this.validateName(name);
    const surnameError: string = this.validateSurname(surname);

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
