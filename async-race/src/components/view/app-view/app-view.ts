import { classes } from '../../../common/js/constants';
import { createDomElement } from '../create-dom-element/create-dom-element';
import { Garage, garage } from '../garage/garage';
import { Modal, modal } from '../modal/modal';
import { Tabs } from '../tabs/tabs';
import { Winners, winners } from '../winners/winners';

export class AppView {
  garage: Garage;

  winners: Winners;

  modal: Modal;

  constructor() {
    this.garage = garage;
    this.winners = winners;
    this.modal = modal;
    this.init();
  }

  init(): void {
    const game: HTMLElement = createDomElement({ tag: 'main', classNames: [classes.game] });
    const gameInner: HTMLElement = createDomElement({
      classNames: [classes.container, classes.gameInner],
    });
    const tabs: HTMLElement = new Tabs({
      buttonsText: ['Garage', 'Winners'],
      tabsNames: ['garage', 'winners'],
      tabsContent: [this.garage.getNode(), this.winners.getNode()],
    }).getNode();

    game.append(gameInner);
    gameInner.append(tabs);
    document.body.append(game);
  }
}

export const appView = new AppView();
