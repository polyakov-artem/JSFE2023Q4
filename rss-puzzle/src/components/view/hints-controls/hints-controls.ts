import { classSelectors, classes } from '../../../common/js/constants';
import { createDomElement } from '../../utils/utils';
import { HintBtn } from '../hint-btn/hint-btn';
import { iconBtn } from '../icon-btn/icon-btn';

export class HintsControls {
  node!: HTMLElement;

  textHintBtn!: HintBtn;

  audioHintBtn!: HintBtn;

  imgHintBtn!: HintBtn;

  getNode(): HTMLElement {
    if (!this.node) {
      this.node = this.createNode();
      this.addListeners();
    }
    return this.node;
  }

  createNode(): HTMLElement {
    const node: HTMLElement = createDomElement({ classNames: [classes.gameHintControls] });
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

    const playbackStatusBtn: HTMLElement = iconBtn({ classNames: [classes.playbackStatusBtn] });
    node.append(
      this.textHintBtn.getNode(),
      this.audioHintBtn.getNode(),
      playbackStatusBtn,
      this.imgHintBtn.getNode(),
    );

    return node;
  }

  addListeners(): void {
    this.textHintBtn.getNode().addEventListener('click', (): void => {
      document
        .querySelector(classSelectors.gameTextHint)!
        .classList.toggle(classes.gameTextHintActive);
    });

    this.audioHintBtn.getNode().addEventListener('click', (): void => {
      document
        .querySelector(classSelectors.playAudioBtn)!
        .classList.toggle(classes.gameAudioBtnActive);
    });

    this.imgHintBtn.getNode().addEventListener('click', (): void => {
      document
        .querySelector(classSelectors.gameTable)!
        .classList.toggle(classes.gameTableBgVisible);
    });
  }
}
