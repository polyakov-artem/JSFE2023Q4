import { classes } from '../../../common/js/constants';
import { createDomElement } from '../../utils/utils';
import { GameSelector } from '../game-selector/game-selector';

export class Game {
  node!: HTMLElement;
  gameSelector!: GameSelector;
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

    node.append(container);
    container.append(window);
    window.append(gameControls);
    gameControls.append(this.gameSelector.getNode());

    return node;
  }
}
