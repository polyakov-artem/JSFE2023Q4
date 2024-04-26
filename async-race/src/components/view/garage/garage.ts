import {
  CARS_PAGE_LIMIT,
  attributeKeys,
  classSelectors,
  classes,
  customEvents,
} from '../../../common/js/constants';
import { Car, CarInfo, RaceWinnerEventData } from '../../../types/types';
import { App } from '../../app/app';
import { disableElement, enableElement } from '../../utils/utils';
import { createDomElement } from '../create-dom-element/create-dom-element';
import { garageControls } from '../garage-controls/garage-controls';
import { garageInner } from '../garage-inner/garage-inner';
import { garageMainControls } from '../garage-main-controls/garage-main-controls';

export class Garage {
  node!: HTMLElement;

  controls!: HTMLElement;

  mainControls!: HTMLElement;

  addCarField!: HTMLElement;

  addCarInput!: HTMLInputElement;

  addCarColorInput!: HTMLInputElement;

  btnStartRaces!: HTMLButtonElement;

  updateCarField!: HTMLElement;

  updateCarInput!: HTMLInputElement;

  updateCarColorInput!: HTMLInputElement;

  updateCarBtn!: HTMLButtonElement;

  constructor() {
    this.createNode();
    this.addLinksToChildNodes();
    this.addListeners();
  }

  getNode(): HTMLElement {
    return this.node;
  }

  createNode(): void {
    this.node = createDomElement({ classNames: [classes.garage] });
    this.controls = garageControls();
    this.mainControls = garageMainControls();
    const garageInnerElement: HTMLElement = createDomElement({ classNames: [classes.garageInner] });
    this.node.append(this.controls, this.mainControls, garageInnerElement);
  }

  addLinksToChildNodes(): void {
    this.btnStartRaces = this.mainControls.querySelector(classSelectors.btnStartRaces)!;
    this.addCarField = this.controls.querySelector(classSelectors.addCarField)!;
    this.addCarInput = this.addCarField.querySelector(classSelectors.input)!;
    this.addCarColorInput = this.addCarField.querySelector(classSelectors.colorSelector)!;

    this.updateCarField = this.controls.querySelector(classSelectors.updateCarField)!;
    this.updateCarInput = this.updateCarField.querySelector(classSelectors.input)!;
    this.updateCarColorInput = this.updateCarField.querySelector(classSelectors.colorSelector)!;
    this.updateCarBtn = this.updateCarField.querySelector(classSelectors.btn)!;
  }

  async updateNode(): Promise<void> {
    const garageInnerElement: HTMLElement = await garageInner();
    this.node.querySelector(classSelectors.garageInner)!.replaceWith(garageInnerElement);
  }

  addListeners(): void {
    this.node.addEventListener('click', (e: MouseEvent): void => {
      this.clickHandler(e);
    });

    this.updateCarColorInput.addEventListener('input', (() => {
      this.updateCarColorHandler();
    }) as EventListener);

    document.addEventListener(customEvents.carStarted, ((e: CustomEvent): void => {
      this.carStartedHandler(e);
    }) as EventListener);

    document.addEventListener(customEvents.carMoving, ((e: CustomEvent): void => {
      this.carMovingHandler(e);
    }) as EventListener);

    document.addEventListener(customEvents.carStopped, ((e: CustomEvent): void => {
      this.carStoppedHandler(e);
    }) as EventListener);

    document.addEventListener(customEvents.carReturn, ((e: CustomEvent): void => {
      this.carReturnHandler(e);
    }) as EventListener);

    document.addEventListener(customEvents.newWinner, ((e: CustomEvent): void => {
      this.showModal(e);
    }) as EventListener);

    document.addEventListener(customEvents.currentCarsUpdate, (() => {
      this.updateNode();
    }) as EventListener);
  }

  clickHandler(e: MouseEvent): void {
    if (!e?.target) return;

    const target: HTMLElement = e.target as HTMLElement;

    if (
      !target.closest(classSelectors.updateCarField) &&
      this.updateCarField.getAttribute(attributeKeys.carId)
    ) {
      this.revertCarColor();
      this.unselectCars();
      this.disableUpdateCarField();
    }

    if (target.closest(classSelectors.btnStartRaces)) {
      this.startRaces();
      return;
    }

    if (target.closest(classSelectors.btnResetRaces)) {
      this.resetRaces();
      return;
    }

    if (target.closest(classSelectors.btnUpdateCar)) {
      this.updateCar();
      return;
    }

    if (target.closest(classSelectors.btnAddCar)) {
      this.addCar();
      return;
    }

    if (target.closest(classSelectors.btnGenerateCars)) {
      this.generateCars();
      return;
    }

    if (target.closest(classSelectors.paginationNextBtn)) {
      this.selectNextPage();
    }

    if (target.closest(classSelectors.paginationPrevBtn)) {
      this.selectPrevPage();
    }

    const car: HTMLElement | null = target.closest(`${classSelectors.car}`);

    if (car) {
      const id: string = car.getAttribute(attributeKeys.carId)!;

      if (target.closest(classSelectors.btnStartCar)) {
        this.startCarRace(id);
        return;
      }

      if (target.closest(classSelectors.btnReturnCar)) {
        this.returnCar(id);
        return;
      }

      if (target.closest(classSelectors.btnSelectCar)) {
        this.selectCar(id);
        return;
      }

      if (target.closest(classSelectors.btnDeleteCar)) {
        this.deleteCar(id);
      }
    }
  }

  updateCarColorHandler(): void {
    const id: string | null = this.updateCarField.getAttribute(attributeKeys.carId);

    if (!id) return;

    const carInfo: CarInfo | null = this.getCarInfo(id);

    if (!carInfo) return;

    carInfo.iconCar.setAttribute('style', `color: ${this.updateCarColorInput.value}`);
  }

  revertCarColor(): void {
    const id: string | null = this.updateCarField.getAttribute(attributeKeys.carId);

    if (!id) return;

    const color: string | null = this.updateCarField.getAttribute(attributeKeys.carColor);
    const carInfo: CarInfo | null = this.getCarInfo(id);

    if (!carInfo || !color) return;

    carInfo.iconCar.setAttribute('style', `color: ${color}`);
  }

  selectNextPage(): void {
    const numOfPages: number = Math.ceil(App.appModel.carsTotal / CARS_PAGE_LIMIT);
    const currentPage: number = App.appModel.carsPageNumber;

    if (currentPage >= numOfPages) return;

    App.appController.garageController.changePageNumber(currentPage + 1);
  }

  selectPrevPage(): void {
    const currentPage: number = App.appModel.carsPageNumber;

    if (currentPage <= 1) return;

    App.appController.garageController.changePageNumber(currentPage - 1);
  }

  showModal(e: CustomEvent): void {
    const winnerData: RaceWinnerEventData = e.detail;
    const text: string = `${winnerData.name} has won! Time: ${(winnerData.time / 1000).toFixed(2)} s`;
    App.appView.modal.setText(text);
    App.appView.modal.open();
  }

  unselectCars(): void {
    this.node.querySelectorAll(classSelectors.carSelected).forEach((car: Element): void => {
      car.classList.remove(classes.carSelected);
    });
  }

  enableUpdateCarField(id: string, name: string = '', color: string = '#adbe4d'): void {
    enableElement(this.updateCarInput);
    enableElement(this.updateCarColorInput);
    enableElement(this.updateCarBtn);

    this.updateCarInput.value = name;
    this.updateCarColorInput.value = color;
    this.updateCarField.setAttribute(attributeKeys.carId, id);
    this.updateCarField.setAttribute(attributeKeys.carColor, color);
  }

  disableUpdateCarField(): void {
    disableElement(this.updateCarInput);
    disableElement(this.updateCarColorInput);
    disableElement(this.updateCarBtn);

    this.updateCarInput.value = '';
    this.updateCarField.removeAttribute(attributeKeys.carId);
    this.updateCarField.removeAttribute(attributeKeys.carColor);
  }

  async resetRaces(): Promise<void> {
    const ids: number[] = App.appModel.currentCars.map((car: Car): number => Number(car.id));
    await App.appController.garageController.resetRace(ids);
    enableElement(this.btnStartRaces);
  }

  async startRaces(): Promise<void> {
    disableElement(this.btnStartRaces);
    const ids: number[] = App.appModel.currentCars.map((car: Car): number => Number(car.id));
    App.appController.garageController.startRace(ids, true);
  }

  generateCars(): void {
    App.appController.garageController.generateCars();
  }

  addCar(): void {
    const name: string = this.addCarInput.value;
    const color: string = this.addCarColorInput.value;
    this.addCarInput.value = '';

    App.appController.garageController.addCars([{ name, color }]);
  }

  updateCar(): void {
    const name: string = this.updateCarInput.value;
    const color: string = this.updateCarColorInput.value;
    const id: string | null = this.updateCarField.getAttribute(attributeKeys.carId);

    if (id === null) return;

    this.disableUpdateCarField();
    App.appController.garageController.updateCar(Number(id), name, color);
  }

  startCarRace(id: string) {
    disableElement(this.btnStartRaces);
    App.appController.garageController.startRace([Number(id)], false);
  }

  returnCar(id: string) {
    const carInfo: CarInfo | null = this.getCarInfo(id);

    if (!carInfo) return;

    disableElement(carInfo.btnReturnCar);
    App.appController.garageController.resetRace([Number(id)]);
  }

  selectCar(id: string): void {
    const carInfo: CarInfo | null = this.getCarInfo(id);

    if (!carInfo) return;

    const color = carInfo.car.getAttribute(attributeKeys.carColor)!;
    const name = carInfo.car.getAttribute(attributeKeys.carName)!;

    this.unselectCars();
    carInfo.car.classList.add(classes.carSelected);
    this.enableUpdateCarField(id, name, color);
  }

  deleteCar(id: string): void {
    App.appController.garageController.deleteCar(Number(id));
    App.appController.winnersController.deleteWinner(Number(id));
  }

  carStartedHandler(e: CustomEvent): void {
    const carInfo: CarInfo | null = this.getCarInfo(e.detail.id);

    if (!carInfo) return;

    disableElement(carInfo.btnStartCar);
    disableElement(carInfo.btnDeleteCar);
    disableElement(carInfo.btnSelectCar);
    disableElement(carInfo.btnReturnCar);
  }

  carMovingHandler(e: CustomEvent): void {
    const carInfo: CarInfo | null = this.getCarInfo(e.detail.id);

    if (!carInfo) return;

    if (!e.detail.isGlobal) enableElement(carInfo.btnReturnCar);

    carInfo.car.classList.add(classes.carOnRace);
    carInfo.carIcon.setAttribute('style', `animation-duration: ${e.detail.time}ms`);
  }

  carStoppedHandler(e: CustomEvent): void {
    const carInfo: CarInfo | null = this.getCarInfo(e.detail.id);

    if (!carInfo) return;

    carInfo.car.classList.add(classes.carStopped);
  }

  carReturnHandler(e: CustomEvent): void {
    const carInfo: CarInfo | null = this.getCarInfo(e.detail.id);

    if (!carInfo) return;

    disableElement(carInfo.btnReturnCar);
    enableElement(carInfo.btnStartCar);
    enableElement(carInfo.btnDeleteCar);
    enableElement(carInfo.btnSelectCar);

    carInfo.carIcon.removeAttribute('style');
    carInfo.car.classList.remove(classes.carOnRace);
    carInfo.car.classList.remove(classes.carStopped);
  }

  getCarInfo(id: string): CarInfo | null {
    const car: HTMLElement | null = this.node.querySelector(
      `${classSelectors.cars} [${attributeKeys.carId}="${id}"]`,
    );
    if (!car) return null;

    const carInfo: CarInfo = {
      id,
      car,
      btnSelectCar: car.querySelector(classSelectors.btnSelectCar)!,
      btnDeleteCar: car.querySelector(classSelectors.btnDeleteCar)!,
      btnStartCar: car.querySelector(classSelectors.btnStartCar)!,
      btnReturnCar: car.querySelector(classSelectors.btnReturnCar)!,
      carIcon: car.querySelector(classSelectors.carIcon)!,
      iconCar: car.querySelector(classSelectors.iconCar)!,
    };

    return carInfo;
  }
}

export const garage = new Garage();
