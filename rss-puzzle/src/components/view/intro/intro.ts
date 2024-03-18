import { INTRO_TEXT, classSelectors, classes } from '../../../common/js/constants';
import { App } from '../../app/app';
import { createDomElement } from '../../utils/utils';
export class Intro {
  node!: HTMLElement;
  getNode() {
    if (!this.node) {
      this.node = this.createNode();
    }
    this.updateView();
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
    const greeting: HTMLElement = createDomElement({
      tag: 'p',
      classNames: [classes.h2, classes.introGreeting],
    });

    node.append(container);
    container.append(window);
    window.append(title, subtitle, grid);
    grid.append(img, column);
    column.append(greeting);

    return node;
  }

  updateView() {
    const { name, surname } = App.appModel.userData;
    const greeeting: HTMLElement = this.node.querySelector(classSelectors.introGreeting)!;
    greeeting.textContent = `Hello, ${name} ${surname}!`;
    greeeting.classList.add(classes.introGreetingVisible);
  }
}
