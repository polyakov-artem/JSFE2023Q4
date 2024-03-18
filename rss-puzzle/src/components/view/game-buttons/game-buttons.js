import { classSelectors, classes } from '../../../common/js/constants.js';
import { App } from '../../app/app.js';
import { createDomElement } from '../../utils/utils.js';
import { primaryBtn } from '../primary-btn/primary-btn.js';

export class GameButtons {
  getNode() {
    if (!this.node) {
      this.node = this.createNode();
      this.addListeners();
    }
    this.updateView();

    return this.node;
  }

  createNode() {
    const node = createDomElement({ classNames: [classes.gameButtons] });
    this.resolveBtn = primaryBtn({
      text: "I don't know",
      isSmall: true,
      classNames: [classes.solveBtn],
    });
    this.checkBtn = primaryBtn({
      text: 'Check',
      disabled: true,
      isSmall: true,
      classNames: [classes.checkBtn],
    });
    this.continueBtn = primaryBtn({
      text: 'Continue',
      isSmall: true,
      classNames: [classes.continueBtn],
    });
    this.showImgBtn = primaryBtn({
      text: 'Continue',
      isSmall: true,
      classNames: [classes.showImgBtn],
    });
    this.resultsBtn = primaryBtn({
      text: 'Results',
      isSmall: true,
      classNames: [classes.resultsBtn],
    });
    node.append(this.resolveBtn, this.checkBtn);
    return node;
  }

  updateView() {
    this.node.innerHTML = '';
    if (App.appModel.isRoundEnded) {
      this.node.append(this.showImgBtn);
      this.node.append(this.resultsBtn);
    } else {
      this.node.append(this.resolveBtn);
      this.node.append(this.checkBtn);
    }
  }

  addListeners() {
    const controller = App.appController.gameController.gameProgressController;

    this.resolveBtn.addEventListener('click', () => {
      controller.solveSentence();
      this.checkBtn.disabled = true;
    });

    this.checkBtn.addEventListener('click', () => this.checkHandler());
    this.showImgBtn.addEventListener('click', () => this.showImgBtnHandler());
    this.continueBtn.addEventListener('click', () => controller.autoSelectNextGame());
    this.resultsBtn.addEventListener('click', () => App.appView.page.statisticsPage.redraw());
  }

  checkHandler() {
    const controller = App.appController.gameController.gameProgressController;
    const { currentSentenceText, currentSentenceNumber } = App.appModel;
    const sentenceField = document.querySelector(`[data-sentence="${currentSentenceNumber}"]`);
    const assembledSentence = [...sentenceField.children].map((el) => el.textContent).join(' ');

    if (currentSentenceText === assembledSentence) {
      sentenceField.classList.add(classes.sentenceCorrect);
      setTimeout(() => {
        sentenceField.classList.remove(classes.sentenceCorrect);
      }, 1500);

      controller.solveSentence(true);
      this.checkBtn.disabled = true;
    } else {
      sentenceField.classList.add(classes.sentenceWrong);
      setTimeout(() => {
        sentenceField.classList.remove(classes.sentenceWrong);
      }, 1000);
    }
  }

  showImgBtnHandler() {
    App.appView.page.gamePage.game.gameArea.showResultImg();
    this.node.querySelector(classSelectors.showImgBtn).replaceWith(this.continueBtn);
  }
}
