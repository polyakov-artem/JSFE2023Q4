import { classes } from '../../../common/js/constants.js';
import { App } from '../../app/app.js';
import { createDomElement } from '../../utils/utils.js';

export class ContinuePage {
  clearPage() {
    const bodyElements = document.querySelectorAll('body > *:not(script)');
    bodyElements.forEach((element) => element.remove());
  }
  redraw() {
    this.clearPage();
    document.body.className = `${classes.page} ${classes.pageStart}`;

    const controller = App.appController.gameController.gameProgressController;
    const { lastLevel, lastRound } = App.appModel.lastPassedRound;

    const subtitleText = `Last level was ${+lastLevel + 1} and last round was ${+lastRound + 1}. Soon the game will be continued!`;
    const greetingText = 'Nice to see you again!';

    const intro = createDomElement({
      tag: 'main',
      classNames: [classes.intro, classes.introFullscreen],
    });
    const container = createDomElement({ classNames: [classes.container, classes.introInner] });
    const window = createDomElement({
      classNames: [classes.window, classes.windowTransparent, classes.windowMedium],
    });
    const title = createDomElement({
      text: 'RSS Puzzle',
      tag: 'h1',
      classNames: [classes.h1, classes.introTitle],
    });
    const subtitle = createDomElement({
      tag: 'p',
      classNames: [classes.h3, classes.introText],
      text: subtitleText,
    });
    const grid = createDomElement({ classNames: [classes.introGrid] });
    const img = createDomElement({
      tag: 'img',
      classNames: [classes.introImg],
      attr: { alt: '', src: require('~images/cat.png') },
    });

    const column = createDomElement({ classNames: [classes.introColumn] });
    const greeting = createDomElement({
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
