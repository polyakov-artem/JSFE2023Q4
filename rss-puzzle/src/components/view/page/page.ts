import { LoginPage } from '../login-page/login-page';
import { StartPage } from '../start-page/start-page';

export class Page {
  loginPage: LoginPage;
  startPage: StartPage;
  constructor() {
    this.loginPage = new LoginPage();
    this.startPage = new StartPage();
  }
}
