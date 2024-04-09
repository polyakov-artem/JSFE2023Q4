import { App } from '../../app/app';
import { iconBtn } from '../icon-btn/icon-btn';

export class HintBtn {
  className: string;

  checkClassName: string;

  node!: HTMLElement;

  isChecked!: boolean;

  constructor({ className = '', checkClassName = '' }) {
    this.className = className;
    this.checkClassName = checkClassName;
  }

  getNode(): HTMLElement {
    if (!this.node) {
      this.node = this.createNode();
      this.addListeners();
    }

    this.isChecked = this.getState();
    this.updateView();

    return this.node;
  }

  createNode(): HTMLElement {
    const node: HTMLElement = iconBtn({ classNames: [this.className] });
    return node;
  }

  getState(): boolean {
    return App.appController.gameController.hintController.getState(this.className);
  }

  addListeners(): void {
    this.node.addEventListener('click', (): void => {
      this.isChecked = !this.isChecked;
      this.updateView();
      this.saveState();
    });
  }

  updateView(): void {
    if (this.isChecked) {
      this.node.classList.add(this.checkClassName);
    } else {
      this.node.classList.remove(this.checkClassName);
    }
  }

  saveState(): void {
    App.appController.gameController.hintController.saveState(this.className, this.isChecked);
  }

  deleteState(): void {
    App.appController.gameController.hintController.deleteState(this.className);
  }
}
