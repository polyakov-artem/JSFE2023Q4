import {
  HTTPMethods,
  TOTAL_COUNT_HEADER_KEY,
  WINNERS_PAGE_LIMIT,
  endpoints,
} from '../../../common/js/constants';
import {
  FetchDataParams,
  FetchReturnData,
  OrderByType,
  SortByType,
  Winner,
} from '../../../types/types';
import { App } from '../../app/app';
import { fetchService } from '../../services/fetch-service/fetch-service';

export class WinnersController {
  async updateCurrentWinners(): Promise<void> {
    const fetchArgs: FetchDataParams = {
      method: HTTPMethods.get,
      endpoint: endpoints.winners,
      queryParts: {
        _page: App.appModel.winnersPageNumber,
        _limit: WINNERS_PAGE_LIMIT,
        _sort: App.appModel.sortWinnersBy,
        _order: App.appModel.orderWinnersBy,
      },
      returnData: true,
    };

    const loadedData: FetchReturnData<Winner[]> = await fetchService.fetchData<Winner[]>(fetchArgs);

    if (!loadedData.response || !loadedData.data) return;

    const total: string = loadedData.response.headers.get(TOTAL_COUNT_HEADER_KEY) as string;
    const winners: Winner[] = loadedData.data;

    App.appModel.setWinnersTotal(Number(total));
    App.appModel.setCurrentWinners(winners);
  }

  async getWinner(id: number): Promise<Winner | undefined> {
    const fetchArgs: FetchDataParams = {
      method: HTTPMethods.get,
      endpoint: `${endpoints.winners}/${id}`,
      returnData: true,
    };

    return (await fetchService.fetchData<Winner>(fetchArgs)).data;
  }

  async addWinner(id: number, time: number): Promise<void> {
    const winnerData: Winner | undefined = await this.getWinner(id);

    if (winnerData) {
      this.updateWinner(winnerData, time);
      return;
    }

    const fetchArgs: FetchDataParams = {
      method: HTTPMethods.post,
      endpoint: endpoints.winners,
      payload: { id, wins: 1, time },
      returnData: false,
    };

    await fetchService.fetchData(fetchArgs);
    this.updateCurrentWinners();
  }

  async updateWinner(winnerData: Winner, time: number): Promise<void> {
    const wins: number = winnerData.wins + 1;
    const { id }: Winner = winnerData;
    const bestTime: number = time < winnerData.time ? time : winnerData.time;

    const fetchArgs: FetchDataParams = {
      method: HTTPMethods.put,
      endpoint: `${endpoints.winners}/${id}`,
      payload: { id, wins, time: bestTime },
      returnData: false,
    };

    await fetchService.fetchData(fetchArgs);
    this.updateCurrentWinners();
  }

  async deleteWinner(id: number): Promise<void> {
    const fetchArgs: FetchDataParams = {
      method: HTTPMethods.delete,
      endpoint: `${endpoints.winners}/${id}`,
      returnData: false,
    };

    await fetchService.fetchData(fetchArgs);
    this.updateCurrentWinners();
  }

  changeSorting(sortBy: SortByType, newOrder: OrderByType): void {
    App.appModel.setSorting(sortBy, newOrder);
    this.updateCurrentWinners();
  }

  changePageNumber(pageNumber: number): void {
    App.appModel.setWinnersPageNumber(pageNumber);
    this.updateCurrentWinners();
  }
}

export const winnersController = new WinnersController();
