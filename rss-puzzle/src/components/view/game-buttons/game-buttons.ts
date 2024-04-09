import { classSelectors, classes } from '../../../common/js/constants';
import { App } from '../../app/app';
import { GameProgressController } from '../../controller/game-progress-controller/game-progress-controller';
import { createDomElement } from '../../utils/utils';
import { primaryBtn } from '../primary-btn/primary-btn';

export class GameButtons {
  node!: HTMLElement;

  checkBtn!: HTMLButtonElement;

  continueBtn!: HTMLButtonElement;

  showImgBtn!: HTMLButtonElement;

  resultsBtn!: HTMLButtonElement;

  resolveBtn!: HTMLButtonElement;

  getNode(): HTMLElement {
    if (!this.node) {
      this.node = this.createNode();
      this.addListeners();
    }
    this.updateView();

    return this.node;
  }

  createNode(): HTMLElement {
    const node: HTMLElement = createDomElement({ classNames: [classes.gameButtons] });
    this.resolveBtn = primaryBtn({
      text: "I don't know",
      isSmall: true,
      classNames: [classes.solveBtn],
    }) as HTMLButtonElement;
    this.checkBtn = primaryBtn({
      text: 'Check',
      disabled: true,
      isSmall: true,
      classNames: [classes.checkBtn],
    }) as HTMLButtonElement;
    this.continueBtn = primaryBtn({
      text: 'Continue',
      isSmall: true,
      classNames: [classes.continueBtn],
    }) as HTMLButtonElement;
    this.showImgBtn = primaryBtn({
      text: 'Continue',
      isSmall: true,
      classNames: [classes.showImgBtn],
    }) as HTMLButtonElement;
    this.resultsBtn = primaryBtn({
      text: 'Results',
      isSmall: true,
      classNames: [classes.resultsBtn],
    }) as HTMLButtonElement;
    node.append(this.resolveBtn, this.checkBtn);
    return node;
  }

  updateView(): void {
    this.node.innerHTML = '';

    if (App.appModel.isRoundEnded) {
      this.node.append(this.showImgBtn);
      this.node.append(this.resultsBtn);
    } else {
      this.node.append(this.resolveBtn);
      this.node.append(this.checkBtn);
    }
  }

  addListeners(): void {
    const controller: GameProgressController =
      App.appController.gameController.gameProgressController;

    this.resolveBtn.addEventListener('click', (): void => {
      controller.solveSentence(false);
      this.checkBtn.disabled = true;
    });

    this.checkBtn.addEventListener('click', (): void => this.checkHandler());
    this.showImgBtn.addEventListener('click', (): void => this.showImgBtnHandler());
    this.continueBtn.addEventListener('click', (): void => controller.autoSelectNextGame());
    this.resultsBtn.addEventListener('click', (): void => App.appView.page.statisticsPage.redraw());
  }

  checkHandler(): void {
    const controller = App.appController.gameController.gameProgressController;
    const { currentSentenceText, currentSentenceNumber } = App.appModel;
    const sentenceField = document.querySelector(
      `[data-sentence="${currentSentenceNumber}"]`,
    ) as HTMLElement;
    const assembledSentence: string = ([...sentenceField.children] as HTMLElement[])

      .map((el: HTMLElement) => el.textContent)
      .join(' ');

    if (currentSentenceText === assembledSentence) {
      sentenceField.classList.add(classes.sentenceCorrect);
      setTimeout((): void => {
        sentenceField.classList.remove(classes.sentenceCorrect);
      }, 3000);

      controller.solveSentence(true);
      this.checkBtn.disabled = true;
    } else {
      sentenceField.classList.add(classes.sentenceWrong);
      setTimeout((): void => {
        sentenceField.classList.remove(classes.sentenceWrong);
      }, 2000);
    }
  }

  showImgBtnHandler(): void {
    App.appView.page.gamePage.game.gameArea.showResultImg();
    this.node.querySelector(classSelectors.showImgBtn)!.replaceWith(this.continueBtn);
  }
}
