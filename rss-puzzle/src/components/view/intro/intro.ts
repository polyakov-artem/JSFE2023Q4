import { INTRO_TEXT, classes } from '../../../common/js/constants';
import { createDomElement } from '../../utils/utils';
export class Intro {
  node!: HTMLElement;
  getNode() {
    if (!this.node) {
      this.node = this.createNode();
    }

    return this.node;
  }

  createNode(): HTMLElement {
    const node: HTMLElement = createDomElement({ tag: 'main', classNames: [classes.intro] });
    const container: HTMLElement = createDomElement({
      classNames: [classes.container, classes.introInner],
    });
    const window: HTMLElement = createDomElement({
      classNames: [classes.window, classes.windowTransparent],
    });
    const title: HTMLElement = createDomElement({
      text: 'RSS Puzzle',
      tag: 'h1',
      classNames: [classes.h1, classes.introTitle],
    });
    const subtitle: HTMLElement = createDomElement({
      tag: 'p',
      classNames: [classes.h3, classes.introText],
      text: INTRO_TEXT,
    });
    const grid: HTMLElement = createDomElement({ classNames: [classes.introGrid] });
    const img: HTMLElement = createDomElement({
      tag: 'img',
      classNames: [classes.introImg],
      attr: { alt: '', src: require('~images/cat.png') },
    });

    const column: HTMLElement = createDomElement({ classNames: [classes.introColumn] });

    node.append(container);
    container.append(window);
    window.append(title, subtitle, grid);
    grid.append(img, column);

    return node;
  }
}
