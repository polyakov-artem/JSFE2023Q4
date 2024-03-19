import { classes } from '../../../common/js/constants';
import { SentenceData } from '../../../types/types';
import { App } from '../../app/app';
import { createDomElement, getGridStyles } from '../../utils/utils';

export class Field {
  node!: HTMLElement;
  getNode(): HTMLElement {
    if (!this.node) {
      this.node = this.createNode();
    }

    return this.node;
  }

  createNode(): HTMLElement {
    this.node = createDomElement({ classNames: [classes.gameField] });
    return this.node;
  }

  addSentences(): void {
    const currentRoundSentences: SentenceData[] = App.appModel.currentRoundSentences;
    for (let i = 0; i < 10; i++) {
      const sentence: HTMLElement = createDomElement({
        classNames: [classes.sentence],
        attr: {
          'data-sentence': `${i}`,
        },
      });

      this.node.append(sentence);
    }

    currentRoundSentences.forEach((sentence: SentenceData, i: number) => {
      const words: string[] = sentence.textExample.split(' ');
      this.node.children[i].setAttribute('style', getGridStyles(words));
    });
  }

  updateView(): void {
    this.node.innerHTML = '';
    this.setAspectRatio();
    this.addSentences();
    this.hideResultImg();
  }

  setAspectRatio(): void {
    const img = createDomElement({
      tag: 'img',
      attr: { src: App.appModel.currentRoundImg },
    }) as HTMLImageElement;
    img.onload = (): void => {
      const ratio = img.width / img.height;

      this.node.setAttribute(
        'style',
        `aspect-ratio: ${ratio}; background-image: url(${App.appModel.currentRoundImg})`,
      );
    };
  }

  showResultImg(): void {
    this.node.classList.add(classes.gameFieldImgVisible);
  }

  hideResultImg(): void {
    this.node.classList.remove(classes.gameFieldImgVisible);
  }
}
