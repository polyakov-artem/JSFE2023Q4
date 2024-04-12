import { classes } from '../../../common/js/constants';
import { createDomElement } from '../create-dom-element/create-dom-element';

export class Modal {
  node!: HTMLElement;

  textNode!: HTMLElement;

  constructor() {
    this.createNode();
    this.addListeners();
  }

  static listenersAdded: boolean = false;

  getNode(): HTMLElement {
    return this.node;
  }

  createNode(): void {
    this.node = createDomElement({ classNames: [classes.modalWindow] });
    this.textNode = createDomElement({ tag: 'p', classNames: [classes.modalWindowText] });
    this.node.append(this.textNode);
    document.body.append(this.node);
  }

  setText(text: string): void {
    this.textNode.textContent = text;
  }

  addListeners(): void {
    if (Modal.listenersAdded) return;

    document.addEventListener('click', (): void => this.close());
    Modal.listenersAdded = true;
  }

  open(): void {
    this.node.classList.add(classes.modalWindowActive);
    this.addLock();
  }

  close(): void {
    this.node.classList.remove(classes.modalWindowActive);
    this.removeLock();
  }

  addLock(): void {
    const scrollWidth: number = this.getScrollWidth();
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';

    if (scrollWidth) {
      document.body.style.paddingRight = `${scrollWidth}px`;
    }
  }

  getScrollWidth(): number {
    return window.innerWidth - document.body.clientWidth;
  }

  removeLock(): void {
    document.body.style.paddingRight = '';
    document.body.style.height = '';
    document.body.style.overflow = '';
  }
}

export const modal: Modal = new Modal();
