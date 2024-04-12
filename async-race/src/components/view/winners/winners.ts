import {
  WINNERS_PAGE_LIMIT,
  attributeKeys,
  classSelectors,
  classes,
  customEvents,
} from '../../../common/js/constants';
import { App } from '../../app/app';
import { createDomElement } from '../create-dom-element/create-dom-element';
import { winnersInner } from '../winners-inner/winners-inner';

export class Winners {
  node!: HTMLElement;

  constructor() {
    this.createNode();
    this.addListeners();
  }

  getNode(): HTMLElement {
    return this.node;
  }

  createNode(): void {
    this.node = createDomElement({ classNames: [classes.winners] });
    const winnersInnerElement: HTMLElement = createDomElement({
      classNames: [classes.winnersInner],
    });
    this.node.append(winnersInnerElement);
  }

  async updateNode(): Promise<void> {
    const winnerInnerElement: HTMLElement = await winnersInner();
    this.node.querySelector(classSelectors.winnersInner)!.replaceWith(winnerInnerElement);
  }

  addListeners(): void {
    document.addEventListener(customEvents.winnersUpdate, () => {
      this.updateNode();
    });

    this.node.addEventListener('click', (e: MouseEvent) => {
      this.clickHandler(e);
    });
  }

  clickHandler(e: MouseEvent): void {
    if (!e?.target) return;

    const btnNextWinners: HTMLButtonElement | null = (e.target as HTMLElement).closest(
      classSelectors.paginationNextBtn,
    );

    if (btnNextWinners) {
      const numOfPages: number = Math.ceil(App.appModel.winnersTotal / WINNERS_PAGE_LIMIT);
      const currentPage: number = App.appModel.winnersPageNumber;
      if (currentPage >= numOfPages) return;
      App.appController.winnersController.changePageNumber(currentPage + 1);
      return;
    }

    const btnPrevWinners: HTMLButtonElement | null = (e.target as HTMLElement).closest(
      classSelectors.paginationPrevBtn,
    );

    if (btnPrevWinners) {
      const currentPage: number = App.appModel.winnersPageNumber;
      if (currentPage <= 1) return;
      App.appController.winnersController.changePageNumber(currentPage - 1);
      return;
    }

    const btnDeleteCar: HTMLButtonElement | null = (e.target as HTMLElement).closest(
      classSelectors.btnDeleteCar,
    );

    if (btnDeleteCar) {
      const id: number = Number(btnDeleteCar.getAttribute(attributeKeys.carId));
      App.appController.winnersController.deleteWinner(id);
    }
  }
}

export const winners = new Winners();
