import { classes } from '../../../common/js/constants.js';
import { createDomElement } from '../../utils/utils.js';
import { GameArea } from '../game-area/game-area.js';
import { GameSelector } from '../game-selector/game-selector.js';
import { HintsControls } from '../hints-controls/hints-controls.js';

export class Game {
  getNode() {
    if (!this.node) {
      this.node = this.createNode();
    }

    return this.node;
  }

  createNode() {
    const node = createDomElement({ tag: 'main', classNames: [classes.game] });
    const container = createDomElement({ classNames: [classes.gameInner, classes.container] });
    const window = createDomElement({
      classNames: [classes.window, classes.windowTransparent, classes.gameWindow],
    });

    const gameControls = createDomElement({ classNames: [classes.gameControls] });
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
