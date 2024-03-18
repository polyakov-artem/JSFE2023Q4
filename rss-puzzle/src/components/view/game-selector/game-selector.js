import { classes } from '../../../common/js/constants.js';
import { App } from '../../app/app.js';
import { createDomElement } from '../../utils/utils.js';
import { Selector } from '../selector/selector.js';

export class GameSelector {
  getNode() {
    if (!this.node) {
      this.node = this.createNode();
      this.addListeners();
    }

    this.updateView();
    return this.node;
  }

  addListeners() {
    const controller = App.appController.gameController.gameProgressController;

    this.levelSelector.getNode().addEventListener('change', () => {
      const level = this.levelSelector.getNode().value;

      if (level === 'choose') {
        this.roundSelector.redraw();
        return;
      }

      this.roundSelector.redraw({
        length: controller.getNumOfRounds(level),
        valuesToPass: controller.getPassedRounds(level),
      });
    });

    this.roundSelector.getNode().addEventListener('change', () => {
      const round = this.roundSelector.getNode().value;
      const level = this.levelSelector.getNode().value;
      if (round === 'choose' || level === 'choose') return;
      controller.selectGame(level, round);
    });
  }

  createNode() {
    const node = createDomElement({ classNames: [classes.gameSelector] });
    const levelBlock = createDomElement({ classNames: [classes.selectorBlock] });
    const roundBlock = createDomElement({ classNames: [classes.selectorBlock] });
    const levelBlockTitle = createDomElement({
      tag: 'span',
      text: 'Level',
      classNames: [classes.h5, classes.selectorBlockTitle],
    });
    const roundBlockTitle = createDomElement({
      tag: 'span',
      text: 'Round',
      classNames: [classes.h5, classes.selectorBlockTitle],
    });

    this.levelSelector = new Selector({
      title: 'Choose level',
      classNames: [classes.levelSelector],
    });
    this.roundSelector = new Selector({
      title: 'Choose round',
      classNames: [classes.levelSelector],
    });

    node.append(levelBlock, roundBlock);
    levelBlock.append(levelBlockTitle, this.levelSelector.getNode());
    roundBlock.append(roundBlockTitle, this.roundSelector.getNode());

    return node;
  }

  updateView() {
    const {
      numOfLevels,
      passedLevels,
      currentLevel,
      currentRound,
      currentNumOfRounds,
      currentLevelPassedRounds,
    } = App.appModel;

    this.levelSelector.redraw({
      length: numOfLevels,
      valuesToPass: passedLevels,
      selectValue: currentLevel,
    });

    this.roundSelector.redraw({
      length: currentNumOfRounds,
      valuesToPass: currentLevelPassedRounds,
      selectValue: currentRound,
    });
  }
}
