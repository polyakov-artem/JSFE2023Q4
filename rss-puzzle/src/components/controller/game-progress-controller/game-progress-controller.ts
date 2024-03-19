import { App } from '../../app/app';

export class GameProgressController {
  startNewGame(): void {
    App.appView.page.gamePage.redraw();
  }
}
