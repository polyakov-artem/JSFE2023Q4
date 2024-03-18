import { App } from '../../app/app.js';
import { iconBtn } from '../icon-btn/icon-btn.js';

export class HintBtn {
  constructor({ className, checkClassName } = {}) {
    this.className = className;
    this.checkClassName = checkClassName;
  }

  getNode() {
    if (!this.node) {
      this.node = this.createNode();
      this.addListeners();
    }

    this.isChecked = this.getState(this.className);
    this.updateView();

    return this.node;
  }

  createNode() {
    const nodeClasses = [this.className];
    this.node = iconBtn({ classNames: nodeClasses });
    return this.node;
  }

  getState() {
    return App.appController.gameController.hintController.getState(this.className);
  }

  addListeners() {
    this.node.addEventListener('click', () => {
      this.isChecked = !this.isChecked;
      this.updateView();
      this.saveState();
    });
  }

  updateView() {
    if (this.isChecked) {
      this.node.classList.add(this.checkClassName);
    } else {
      this.node.classList.remove(this.checkClassName);
    }
  }

  saveState() {
    return App.appController.gameController.hintController.saveState(
      this.className,
      this.isChecked,
    );
  }

  deleteState() {
    return App.appController.gameController.hintController.deleteState(this.className);
  }
}
