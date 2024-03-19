import { classes } from '../../../common/js/constants';
import { createDomElement } from '../../utils/utils';
import { GameArea } from '../game-area/game-area';
import { GameSelector } from '../game-selector/game-selector';
import { HintsControls } from '../hints-controls/hints-controls';

export class Game {
  node!: HTMLElement;
  gameSelector!: GameSelector;
  gameArea!: GameArea;
  hintsControls!: HintsControls;
  getNode(): HTMLElement {
    if (!this.node) {
      this.node = this.createNode();
    }

    return this.node;
  }

  createNode(): HTMLElement {
    const node: HTMLElement = createDomElement({ tag: 'main', classNames: [classes.game] });
    const container: HTMLElement = createDomElement({
      classNames: [classes.gameInner, classes.container],
    });
    const window: HTMLElement = createDomElement({
      classNames: [classes.window, classes.windowTransparent, classes.gameWindow],
    });

    const gameControls: HTMLElement = createDomElement({ classNames: [classes.gameControls] });
    this.gameSelector = new GameSelector();
    this.gameArea = new GameArea();
    this.hintsControls = new HintsControls();

    node.append(container);
    container.append(window);
    window.append(gameControls, this.gameArea.getNode());
    gameControls.append(this.gameSelector.getNode(), this.hintsControls.getNode());

    return node;
  }
}
