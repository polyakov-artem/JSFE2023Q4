import { INTRO_TEXT, classSelectors, classes } from '../../../common/js/constants';
import { AuthData } from '../../../types/types';
import { App } from '../../app/app';
import { createDomElement } from '../../utils/utils';
import { primaryBtn } from '../primary-btn/primary-btn';

export class Intro {
  node!: HTMLElement;
  getNode(): HTMLElement {
    if (!this.node) {
      this.node = this.createNode();
      this.addListeners();
    }
    this.updateView();
    return this.node;
  }

  addListeners() {
    this.node.querySelector(classSelectors.introStartBtn)!.addEventListener('click', () => {
      App.appController.gameController.gameProgressController.startNewGame();
    });
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
    const startBtn: HTMLElement = primaryBtn({
      text: 'Start',
      classNames: [classes.introStartBtn],
    });

    node.append(container);
    container.append(window);
    window.append(title, subtitle, grid);
    grid.append(img, column);
    column.append(greeting, startBtn);

    return node;
  }

  updateView(): void {
    const { name, surname }: AuthData = App.appModel.userData;
    const greeting: HTMLElement = this.node.querySelector(classSelectors.introGreeting)!;
    greeting.textContent = `Hello, ${name} ${surname}!`;
    greeting.classList.add(classes.introGreetingVisible);
  }
}
