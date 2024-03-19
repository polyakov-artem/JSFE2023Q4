import { classes } from '../../../common/js/constants';
import { LastPassedRound } from '../../../types/types';
import { App } from '../../app/app';
import { GameProgressController } from '../../controller/game-progress-controller/game-progress-controller';
import { createDomElement } from '../../utils/utils';

export class ContinuePage {
  clearPage(): void {
    const bodyElements: NodeListOf<Element> = document.querySelectorAll('body > *:not(script)');
    bodyElements.forEach((element) => element.remove());
  }
  redraw(): void {
    this.clearPage();
    document.body.className = `${classes.page} ${classes.pageStart}`;

    const controller: GameProgressController =
      App.appController.gameController.gameProgressController;
    const { lastLevel, lastRound }: LastPassedRound = App.appModel.lastPassedRound;

    const subtitleText: string = `Last level was ${+(lastLevel || '') + 1} and last round was ${+(lastRound || '') + 1}. Soon the game will be continued!`;
    const greetingText: string = 'Nice to see you again!';

    const intro: HTMLElement = createDomElement({
      tag: 'main',
      classNames: [classes.intro, classes.introFullscreen],
    });
    const container: HTMLElement = createDomElement({
      classNames: [classes.container, classes.introInner],
    });
    const window: HTMLElement = createDomElement({
      classNames: [classes.window, classes.windowTransparent, classes.windowMedium],
    });
    const title: HTMLElement = createDomElement({
      text: 'RSS Puzzle',
      tag: 'h1',
      classNames: [classes.h1, classes.introTitle],
    });
    const subtitle: HTMLElement = createDomElement({
      tag: 'p',
      classNames: [classes.h3, classes.introText],
      text: subtitleText,
    });
    const grid: HTMLElement = createDomElement({ classNames: [classes.introGrid] });
    const img: HTMLElement = createDomElement({
      tag: 'img',
      classNames: [classes.introImg],
      attr: { alt: '', src: require('~images/cat.png') },
    });

    const column: HTMLElement = createDomElement({ classNames: [classes.introColumn] });
    const greeting: HTMLElement = createDomElement({
      text: greetingText,
      tag: 'p',
      classNames: [classes.h2, classes.introGreeting],
    });

    document.body.append(intro);
    intro.append(container);
    container.append(window);
    window.append(title, subtitle, grid);
    grid.append(img, column);
    column.append(greeting);
    greeting.classList.add(classes.introGreetingVisible);

    setTimeout(() => {
      controller.autoSelectNextGame();
    }, 3000);
  }
}
