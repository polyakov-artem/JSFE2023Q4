import { attributeKeys, classSelectors, classes, order, sort } from '../../../common/js/constants';
import { OrderByType, SortByType } from '../../../types/types';
import { App } from '../../app/app';
import { primaryBtn } from '../primary-btn/primary-btn';

export class BtnSortBy {
  node!: HTMLButtonElement;

  constructor(sortBy: SortByType, classNames: string[] = []) {
    this.addListeners();
    this.createNode(sortBy, classNames);
  }

  static listenersAdded = false;

  getNode(): HTMLButtonElement {
    return this.node;
  }

  createNode(sortBy: SortByType, classNames: string[]): void {
    let orderBy: OrderByType;

    if (sortBy === sort.time) {
      orderBy = App.appModel.btnSortByTimeOrder;
    } else {
      orderBy = App.appModel.btnSortByWinsOrder;
    }

    const text: string = orderBy === order.asc ? '↓' : '↑';

    const btn: HTMLButtonElement = primaryBtn({
      classNames: [classes.btnSortBy, ...classNames],
      text,
      attr: {
        [attributeKeys.sortBy]: sortBy,
        [attributeKeys.orderBy]: orderBy,
      },
    });

    this.node = btn;
  }

  addListeners(): void {
    if (BtnSortBy.listenersAdded) return;

    document.addEventListener('click', (e: MouseEvent): void => {
      this.clickHandler(e);
    });

    BtnSortBy.listenersAdded = true;
  }

  clickHandler(e: MouseEvent) {
    if (!e?.target) return;

    const btn: HTMLElement | null = (e.target as HTMLElement).closest(classSelectors.btnSortBy);

    if (!btn) return;

    const sortBy: SortByType = btn.getAttribute(attributeKeys.sortBy) as SortByType;
    let orderBy: OrderByType;

    if (sortBy === sort.time) {
      orderBy = App.appModel.btnSortByTimeOrder;
    } else {
      orderBy = App.appModel.btnSortByWinsOrder;
    }

    const newOrder: OrderByType = orderBy === order.asc ? order.desc : order.asc;
    App.appController.winnersController.changeSorting(sortBy, newOrder);
  }
}
