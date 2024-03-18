import { classes } from '../../../common/js/constants.js';
import { Game } from '../game/game.js';
import { Header } from '../header/header.js';

export class GamePage {
  clearPage() {
    const bodyElements = document.querySelectorAll('body > *:not(script)');
    bodyElements.forEach((element) => element.remove());
  }

  redraw() {
    this.clearPage();
    document.body.className = `${classes.page} ${classes.pageGame}`;

    if (!this.header) {
      this.header = new Header();
    }
    if (!this.game) {
      this.game = new Game();
    }
    document.body.append(this.header.getNode(), this.game.getNode());
    this.game.gameSelector.updateView();
    this.game.gameArea.updateView();
  }
}
