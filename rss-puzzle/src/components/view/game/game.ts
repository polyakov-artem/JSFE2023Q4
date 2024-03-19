import { classes } from '../../../common/js/constants';
import { createDomElement } from '../../utils/utils';

export class Game {
  node!: HTMLElement;
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

    node.append(container);
    container.append(window);

    return node;
  }
}
