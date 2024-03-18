import { classSelectors, classes } from '../../../common/js/constants.js';
import { createDomElement } from '../../utils/utils.js';
import { HintBtn } from '../hint-btn/hint-btn.js';

export class HintsControls {
  getNode() {
    if (!this.node) {
      this.node = this.createNode();
      this.addListeners();
    }
    return this.node;
  }

  createNode() {
    const node = createDomElement({ classNames: [classes.gameHintControls] });
    this.textHintBtn = new HintBtn({
      className: classes.textHintBtn,
      checkClassName: classes.iconBtnChecked,
    });
    this.audioHintBtn = new HintBtn({
      className: classes.audioHintBtn,
      checkClassName: classes.iconBtnChecked,
    });
    this.imgHintBtn = new HintBtn({
      className: classes.imgHintBtn,
      checkClassName: classes.iconBtnChecked,
    });
    node.append(this.textHintBtn.getNode(), this.audioHintBtn.getNode(), this.imgHintBtn.getNode());

    return node;
  }

  addListeners() {
    this.textHintBtn.getNode().addEventListener('click', () => {
      document
        .querySelector(classSelectors.gameTextHint)
        .classList.toggle(classes.gameTextHintActive);
    });

    this.audioHintBtn.getNode().addEventListener('click', () => {
      document
        .querySelector(classSelectors.playAudioBtn)
        .classList.toggle(classes.gameAudioBtnActive);
    });

    this.imgHintBtn.getNode().addEventListener('click', () => {
      document.querySelector(classSelectors.gameTable).classList.toggle(classes.gameTableBgVisible);
    });
  }
}
