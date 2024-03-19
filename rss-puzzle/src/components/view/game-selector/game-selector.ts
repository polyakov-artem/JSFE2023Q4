import { classes } from '../../../common/js/constants';
import { App } from '../../app/app';
import { GameProgressController } from '../../controller/game-progress-controller/game-progress-controller';
import { createDomElement } from '../../utils/utils';
import { Selector } from '../selector/selector';

export class GameSelector {
  node!: HTMLElement;
  levelSelector!: Selector;
  roundSelector!: Selector;

  getNode(): HTMLElement {
    if (!this.node) {
      this.node = this.createNode();
      this.addListeners();
    }

    this.updateView();
    return this.node;
  }

  addListeners(): void {
    const controller: GameProgressController =
      App.appController.gameController.gameProgressController;

    this.levelSelector.getNode().addEventListener('change', () => {
      const level: string = this.levelSelector.getNode().value;

      if (level === 'choose') {
        this.roundSelector.redraw();
        return;
      }

      this.roundSelector.redraw({
        length: controller.getNumOfRounds(+level),
        valuesToPass: controller.getPassedRounds(+level),
      });
    });

    this.roundSelector.getNode().addEventListener('change', () => {
      const round: string = this.roundSelector.getNode().value;
      const level: string = this.levelSelector.getNode().value;
      if (round === 'choose' || level === 'choose') return;
      controller.selectGame(+level, +round);
    });
  }

  createNode(): HTMLElement {
    const node: HTMLElement = createDomElement({ classNames: [classes.gameSelector] });
    const levelBlock: HTMLElement = createDomElement({ classNames: [classes.selectorBlock] });
    const roundBlock: HTMLElement = createDomElement({ classNames: [classes.selectorBlock] });
    const levelBlockTitle: HTMLElement = createDomElement({
      tag: 'span',
      text: 'Level',
      classNames: [classes.h5, classes.selectorBlockTitle],
    });
    const roundBlockTitle: HTMLElement = createDomElement({
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

  updateView(): void {
    const { numOfLevels, currentLevel, currentRound, currentNumOfRounds } = App.appModel;

    this.levelSelector.redraw({
      length: numOfLevels,
      selectValue: `${currentLevel}`,
    });

    this.roundSelector.redraw({
      length: currentNumOfRounds,
      selectValue: `${currentRound}`,
    });
  }
}
