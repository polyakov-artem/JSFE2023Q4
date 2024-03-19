import { classes } from '../../../common/js/constants';
import { Game } from '../game/game';
import { Header } from '../header/header';

export class GamePage {
  game!: Game;
  header!: Header;
  clearPage(): void {
    const bodyElements = document.querySelectorAll('body > *:not(script)');
    bodyElements.forEach((element) => element.remove());
  }

  redraw(): void {
    this.clearPage();
    document.body.className = `${classes.page} ${classes.pageGame}`;

    if (!this.header) {
      this.header = new Header();
    }
    if (!this.game) {
      this.game = new Game();
    }
    document.body.append(this.header.getNode(), this.game.getNode());
  }
}
