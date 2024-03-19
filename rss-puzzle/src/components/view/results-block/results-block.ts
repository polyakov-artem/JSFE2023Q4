import { classSelectors, classes } from '../../../common/js/constants';
import { App } from '../../app/app';
import { createDomElement } from '../../utils/utils';
import { primaryBtn } from '../primary-btn/primary-btn';
import { results } from '../results/results';
import { thumbnail } from '../thumbnail/thumbnail';

export class ResultBlocks {
  node!: HTMLElement;
  continueBtn!: HTMLElement;

  getNode(): HTMLElement {
    if (!this.node) {
      this.node = this.createNode();
      this.addListeners();
    }

    this.updateView();
    return this.node;
  }

  createNode(): HTMLElement {
    const node: HTMLElement = createDomElement({ classNames: [classes.resultsBlock] });
    const title: HTMLElement = createDomElement({
      tag: 'h2',
      classNames: [classes.resultsBlockTitle, classes.h1],
      text: 'Statistics',
    });
    const buttonsContainer: HTMLElement = createDomElement({
      classNames: [classes.resultsBlockButtons],
    });
    this.continueBtn = primaryBtn({ text: 'Continue', classNames: [classes.continueBtn] });
    node.append(title, buttonsContainer);
    buttonsContainer.append(this.continueBtn);

    return node;
  }

  addListeners(): void {
    this.continueBtn.addEventListener('click', (): void => {
      App.appController.gameController.gameProgressController.autoSelectNextGame();
    });
  }

  updateView(): void {
    const { resolved, notResolved }: { resolved: number[]; notResolved: number[] } =
      App.appModel.lastRoundResults;
    const { imageSrc }: { imageSrc: string } = App.appModel.currentRoundData.roundResult;
    const captionText: string = App.appModel.currentImgCaption;

    this.node.querySelectorAll(classSelectors.results).forEach((element: Element): void => {
      element.remove();
    });

    this.node.querySelectorAll(classSelectors.thumbnail).forEach((element: Element): void => {
      element.remove();
    });

    const thumbnailElement: HTMLElement = thumbnail({ caption: captionText, src: imageSrc });

    this.node.querySelector(classSelectors.resultsBlockTitle)!.after(thumbnailElement);

    if (notResolved.length) {
      const errorResults: HTMLElement = results({ type: 'error', list: notResolved });
      this.node.querySelector(classSelectors.thumbnail)!.after(errorResults);
    }

    if (resolved.length) {
      const successResults: HTMLElement = results({ type: 'success', list: resolved });
      this.node.querySelector(classSelectors.thumbnail)!.after(successResults);
    }
  }
}
