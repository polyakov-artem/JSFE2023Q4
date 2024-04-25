import { classes } from '../../../common/js/constants';
import { createDomElement } from '../create-dom-element/create-dom-element';
import { Garage, garage as garageView } from '../garage/garage';
import { Modal, modal as modalView } from '../modal/modal';
import { Winners, winners as winnersView } from '../winners/winners';
import { Tabs } from '../tabs/tabs';

export class AppView {
  constructor(
    readonly garage: Garage,
    readonly winners: Winners,
    readonly modal: Modal,
  ) {
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

export const appView = new AppView(garageView, winnersView, modalView);
