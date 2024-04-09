import { ContinuePage } from '../continue-page/continue-page';
import { GamePage } from '../game-page/game-page';
import { LoginPage } from '../login-page/login-page';
import { StartPage } from '../start-page/start-page';
import { StatisticsPage } from '../statistics-page/statistics-page';

export class Page {
  loginPage: LoginPage;
  startPage: StartPage;
  gamePage: GamePage;
  continuePage: ContinuePage;
  statisticsPage: StatisticsPage;
  constructor() {
    this.loginPage = new LoginPage();
    this.startPage = new StartPage();
    this.gamePage = new GamePage();
    this.continuePage = new ContinuePage();
    this.statisticsPage = new StatisticsPage();
  }
}