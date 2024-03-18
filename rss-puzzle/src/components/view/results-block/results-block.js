import { classSelectors, classes } from '../../../common/js/constants.js';
import { App } from '../../app/app.js';
import { createDomElement } from '../../utils/utils.js';
import { primaryBtn } from '../primary-btn/primary-btn.js';
import { results } from '../results/results.js';
import { thumbnail } from '../thumbnail/thumbnail.js';

export class ResultBlocks {
  getNode() {
    if (!this.node) {
      this.node = this.createNode();
      this.addListeners();
    }

    this.updateView();
    return this.node;
  }

  createNode() {
    const node = createDomElement({ classNames: [classes.resultsBlock] });
    const title = createDomElement({
      tag: 'h2',
      classNames: [classes.resultsBlockTitle, classes.h1],
      text: 'Statistics',
    });
    const buttonsContainer = createDomElement({ classNames: [classes.resultsBlockButtons] });
    this.continueBtn = primaryBtn({ text: 'Continue', classNames: [classes.continueBtn] });
    node.append(title, buttonsContainer);
    buttonsContainer.append(this.continueBtn);

    return node;
  }

  addListeners() {
    this.continueBtn.addEventListener('click', () => {
      App.appController.gameController.gameProgressController.autoSelectNextGame();
    });
  }

  updateView() {
    const { resolved, notResolved } = App.appModel.lastRoundResults;
    const { imageSrc } = App.appModel.currentRoundData.roundResult;
    const captionText = App.appModel.currentImgCaption;

    this.node.querySelectorAll(classSelectors.results).forEach((element) => {
      element.remove();
    });

    this.node.querySelectorAll(classSelectors.thumbnail).forEach((element) => {
      element.remove();
    });

    const thumbnailElement = thumbnail({ caption: captionText, src: imageSrc });

    this.node.querySelector(classSelectors.resultsBlockTitle).after(thumbnailElement);

    if (notResolved.length) {
      const errorResults = results({ type: 'error', list: notResolved });
      this.node.querySelector(classSelectors.thumbnail).after(errorResults);
    }

    if (resolved.length) {
      const successResults = results({ type: 'success', list: resolved });
      this.node.querySelector(classSelectors.thumbnail).after(successResults);
    }
  }
}
