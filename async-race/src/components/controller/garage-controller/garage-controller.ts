import {
  CARS_PAGE_LIMIT,
  DISTANCE,
  HTTPMethods,
  HTTPStatusCodes,
  NUM_OF_CARS_TO_ADD,
  TOTAL_COUNT_HEADER_KEY,
  carManufacturers,
  carPostfixes,
  customEvents,
  endpoints,
  engineStates,
} from '../../../common/js/constants';
import {
  Car,
  CarUpdateData,
  EngineData,
  EngineStates,
  FetchDataParams,
  FetchReturnData,
  PromiseCbFn,
  RaceWinner,
} from '../../../types/types';
import { App } from '../../app/app';
import { fetchService } from '../../services/fetch-service/fetch-service';
import { dispatchCustomEvent, generateHEXColor, getRandom } from '../../utils/utils';

export class GarageController {
  async updateCurrentCars(): Promise<void> {
    const fetchArgs: FetchDataParams = {
      method: HTTPMethods.get,
      endpoint: endpoints.garage,
      queryParts: {
        _page: App.appModel.carsPageNumber,
        _limit: CARS_PAGE_LIMIT,
      },
      returnData: true,
    };

    const loadedData: FetchReturnData<Car[]> = await fetchService.fetchData<Car[]>(fetchArgs);

    if (!loadedData.response || !loadedData.data) return;

    const total: string = loadedData.response.headers.get(TOTAL_COUNT_HEADER_KEY) as string;
    const cars: Car[] = loadedData.data;

    App.appModel.setCarsTotal(Number(total));
    App.appModel.setCurrentCars(cars);
  }

  async getCar(id: number): Promise<Car | undefined> {
    const fetchArgs: FetchDataParams = {
      method: HTTPMethods.get,
      endpoint: `${endpoints.garage}/${id}`,
      returnData: true,
    };

    return (await fetchService.fetchData<Car>(fetchArgs)).data;
  }

  async addCars(cars: CarUpdateData[]): Promise<void> {
    const promises: Promise<FetchReturnData<Car>>[] = [];

    cars.forEach((car: CarUpdateData): void => {
      const fetchArgs: FetchDataParams = {
        method: HTTPMethods.post,
        endpoint: endpoints.garage,
        payload: { name: car.name, color: car.color },
        returnData: false,
      };

      promises.push(fetchService.fetchData<Car>(fetchArgs));
    });

    await Promise.allSettled(promises);
    this.updateCurrentCars();
  }

  async deleteCar(id: number): Promise<void> {
    const fetchArgs: FetchDataParams = {
      method: HTTPMethods.delete,
      endpoint: `${endpoints.garage}/${id}`,
      returnData: false,
    };

    await fetchService.fetchData(fetchArgs);
    this.updateCurrentCars();
  }

  async updateCar(id: number, name: string, color: string): Promise<void> {
    const car: Car | undefined = await this.getCar(id);

    if (!car) return;

    const fetchArgs: FetchDataParams = {
      method: HTTPMethods.put,
      endpoint: `${endpoints.garage}/${id}`,
      payload: { name, color },
      returnData: false,
    };

    await fetchService.fetchData(fetchArgs);
    this.updateCurrentCars();
  }

  generateCars(): void {
    const cars: CarUpdateData[] = [];
    for (let i = 1; i <= NUM_OF_CARS_TO_ADD; i += 1) {
      const manufacturer: string = carManufacturers[getRandom(0, carManufacturers.length - 1)];
      const postfix: string = carPostfixes[getRandom(0, carPostfixes.length - 1)];
      const carName: string = `${manufacturer} ${postfix}`;
      const color: string = generateHEXColor();
      cars.push({ name: carName, color });
    }

    this.addCars(cars);
  }

  async changeCarEngineState(id: number, state: EngineStates): Promise<EngineData | undefined> {
    const fetchArgs: FetchDataParams = {
      method: HTTPMethods.patch,
      endpoint: endpoints.engine,
      queryParts: { id, status: state },
      returnData: true,
    };

    return (await fetchService.fetchData<EngineData>(fetchArgs)).data;
  }

  async startCarEngine(id: number): Promise<EngineData | undefined> {
    return this.changeCarEngineState(id, engineStates.started);
  }

  async stopCarEngine(id: number): Promise<EngineData | undefined> {
    return this.changeCarEngineState(id, engineStates.stopped);
  }

  async setEngineToDriveMode(id: number): Promise<Response | undefined> {
    const fetchArgs: FetchDataParams = {
      method: HTTPMethods.patch,
      endpoint: endpoints.engine,
      queryParts: { id, status: engineStates.driveMode },
      returnData: false,
    };

    return (await fetchService.fetchData(fetchArgs)).response;
  }

  async startRace(ids: number[], isGlobal: boolean): Promise<void> {
    let raceWinner: RaceWinner | null = null;

    ids.forEach(async (id: number): Promise<void> => {
      dispatchCustomEvent(customEvents.carStarted, { id });
      const engineData: EngineData | undefined = await this.startCarEngine(id);

      if (!engineData) return;

      const time: number = DISTANCE / engineData.velocity;
      dispatchCustomEvent(customEvents.carMoving, { id, time, isGlobal });

      let timer: number = 0;
      let promiseRejectFn: PromiseCbFn;

      const raceStopListener = (e: CustomEvent) => {
        if (e.detail === id) promiseRejectFn(new Error());
      };

      document.addEventListener(customEvents.raceStopped, raceStopListener as EventListener);

      try {
        const winner: RaceWinner = await new Promise<RaceWinner>((resolve, reject) => {
          promiseRejectFn = reject;

          timer = setTimeout(() => {
            resolve({ id, time });
          }, time);

          this.setEngineToDriveMode(id).then((response) => {
            if (!response || Number(response.status) === HTTPStatusCodes.internalServerError) {
              reject(new Error());
            }
          });
        });

        if (!raceWinner && isGlobal) {
          raceWinner = winner;
          this.addWinner(winner);
        }
      } catch (e) {
        () => {};
      } finally {
        clearTimeout(timer);
        dispatchCustomEvent(customEvents.carStopped, { id });
        document.removeEventListener(customEvents.raceStopped, raceStopListener as EventListener);
      }
    });
  }

  async addWinner(winner: RaceWinner): Promise<void> {
    const winnerData: Car | undefined = await this.getCar(winner.id);

    if (!winnerData) return;

    const { name } = winnerData;

    dispatchCustomEvent(customEvents.newWinner, {
      name,
      time: winner.time,
    });

    App.appController.winnersController.addWinner(
      winner.id,
      Number((winner.time / 1000).toFixed(2)),
    );
  }

  async resetRace(ids: number[]): Promise<void> {
    const promises = ids.map(async (id: number): Promise<void> => {
      dispatchCustomEvent(customEvents.raceStopped, id);
      await this.stopCarEngine(id);
      dispatchCustomEvent(customEvents.carReturn, { id });
    });

    await Promise.all(promises);
  }

  changePageNumber(pageNumber: number): void {
    App.appModel.setCarsPageNumber(pageNumber);
    this.updateCurrentCars();
  }
}

export const garageController = new GarageController();
