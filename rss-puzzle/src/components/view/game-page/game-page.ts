import { classes } from '../../../common/js/constants';
import { Game } from '../game/game';
import { Header } from '../header/header';

export class GamePage {
  game!: Game;

  header!: Header;

  clearPage(): void {
    const bodyElements: NodeListOf<Element> = document.querySelectorAll('body > *:not(script)');
    bodyElements.forEach((element: Element): void => element.remove());
  }

  redraw(): void {
    this.clearPage();
    document.body.className = `${classes.page} ${classes.pageGame}`;

    this.header ??= new Header();
    this.game ??= new Game();

    document.body.append(this.header.getNode(), this.game.getNode());
    this.game.gameSelector.updateView();
    this.game.gameArea.updateView();
  }
}
