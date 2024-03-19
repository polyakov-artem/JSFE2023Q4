import { GamePage } from '../game-page/game-page';
import { LoginPage } from '../login-page/login-page';
import { StartPage } from '../start-page/start-page';

export class Page {
  loginPage: LoginPage;
  startPage: StartPage;
  gamePage: GamePage;
  constructor() {
    this.loginPage = new LoginPage();
    this.startPage = new StartPage();
    this.gamePage = new GamePage();
  }
}
