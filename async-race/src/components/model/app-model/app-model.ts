import {
  INITIAL_SORTING_ORDER,
  INITIAL_WINNERS_SORTING,
  customEvents,
  sort,
} from '../../../common/js/constants';
import { Car, OrderByType, SortByType, Winner } from '../../../types/types';
import { dispatchCustomEvent } from '../../utils/utils';

export class AppModel {
  carsTotal: number;

  winnersTotal: number;

  currentWinners: Winner[];

  currentCars: Car[];

  carsPageNumber: number;

  winnersPageNumber: number;

  sortWinnersBy: SortByType;

  orderWinnersBy: OrderByType;

  btnSortByTimeOrder: OrderByType;

  btnSortByWinsOrder: OrderByType;

  constructor(initialWinnersSorting: SortByType, initialOrder: OrderByType) {
    this.carsTotal = 0;
    this.winnersTotal = 0;
    this.currentWinners = [];
    this.currentCars = [];
    this.carsPageNumber = 1;
    this.winnersPageNumber = 1;
    this.sortWinnersBy = initialWinnersSorting;
    this.orderWinnersBy = initialOrder;
    this.btnSortByTimeOrder = initialOrder;
    this.btnSortByWinsOrder = initialOrder;
  }

  setCarsTotal(value: number): void {
    this.carsTotal = value;
  }

  setCurrentCars(value: Car[]): void {
    this.currentCars = value;
    dispatchCustomEvent(customEvents.currentCarsUpdate);
  }

  setCarsPageNumber(value: number): void {
    this.carsPageNumber = value;
  }

  setWinnersTotal(value: number): void {
    this.winnersTotal = value;
  }

  setCurrentWinners(value: Winner[]): void {
    this.currentWinners = value;
    dispatchCustomEvent(customEvents.winnersUpdate);
  }

  setWinnersPageNumber(value: number): void {
    this.winnersPageNumber = value;
  }

  setSorting(sortBy: SortByType, orderBy: OrderByType): void {
    this.sortWinnersBy = sortBy;
    this.orderWinnersBy = orderBy;

    switch (sortBy) {
      case sort.time:
        this.btnSortByTimeOrder = orderBy;
        break;

      case sort.wins:
        this.btnSortByWinsOrder = orderBy;
        break;
      default:
    }
  }
}

export const appModel: AppModel = new AppModel(INITIAL_WINNERS_SORTING, INITIAL_SORTING_ORDER);
