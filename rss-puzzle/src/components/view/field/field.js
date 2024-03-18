import { classes } from '../../../common/js/constants.js';
import { App } from '../../app/app.js';
import { createDomElement, getGridStyles } from '../../utils/utils.js';

export class Field {
  getNode() {
    if (!this.node) {
      this.node = this.createNode();
    }

    return this.node;
  }

  createNode() {
    this.node = createDomElement({ classNames: [classes.gameField] });
    return this.node;
  }

  addSentences() {
    const { currentRoundSentences } = App.appModel;
    for (let i = 0; i < 10; i++) {
      const sentence = createDomElement({
        classNames: [classes.sentence],
        attr: {
          'data-sentence': `${i}`,
        },
      });

      this.node.append(sentence);
    }

    currentRoundSentences.forEach((sentence, i) => {
      const words = sentence.textExample.split(' ');
      this.node.children[i].style = getGridStyles(words);
    });
  }

  updateView() {
    this.setAspectRatio();
    this.addSentences();
    this.hideResultImg();
  }

  setAspectRatio() {
    const img = createDomElement({ tag: 'img', attr: { src: App.appModel.currentRoundImg } });
    img.onload = () => {
      const ratio = img.width / img.height;

      this.node.style = `aspect-ratio: ${ratio}; background-image: url(${App.appModel.currentRoundImg})`;
    };
  }

  showResultImg() {
    this.node.classList.add(classes.gameFieldImgVisible);
  }

  hideResultImg() {
    this.node.classList.remove(classes.gameFieldImgVisible);
  }
}
