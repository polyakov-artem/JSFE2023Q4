import { classes, selectors, events } from "./modal-constants.js";
import { createDomElement } from "./utils.js";

export class Modal {
  constructor() {
    this._createDom();
    this._setDomVars();
    this._bindEvents();
  }

  _createDom() {
    const backdrop = createDomElement({ classes: classes.backdrop });
    const modalBlock = createDomElement({ classes: classes.modalBlock });
    const modalWindow = createDomElement({ classes: classes.modalWindow });
    modalBlock.append(modalWindow);
    document.querySelector("body").prepend(backdrop, modalBlock);
  }

  _setDomVars() {
    this.domBody = document.querySelector("body");
    this.domBackdrop = this.domBody.querySelector("." + classes.backdrop);
    this.domModalBlock = this.domBody.querySelector("." + classes.modalBlock);
  }

  _bindEvents() {
    document.addEventListener("click", this._clickHandler.bind(this));
  }

  _clickHandler(e) {
    const openBtn = e.target.closest(selectors.openBtn);
    const closeBtn = e.target.closest(selectors.closeBtn);
    const modalWindow = e.target.closest("." + classes.modalWindow);

    if (openBtn) {
      e.preventDefault();
      this.show();
      return;
    }

    if (closeBtn) {
      this.hide();
    }
  }

  show() {
    this._addLock();
    this._addModalClasses();
    this._dispatchEvent(events.openWindow);
  }

  hide() {
    this._removeLock();
    this._removeModalClasses();
    this._dispatchEvent(events.closeWindow);
  }

  _addLock() {
    const scrollWidth = this._getScrollWidth();
    this.domBody.style.height = "100%";
    this.domBody.style.overflow = "hidden";

    if (scrollWidth) {
      this.domBody.style.paddingRight = scrollWidth + "px";
    }
  }

  _getScrollWidth() {
    return window.innerWidth - this.domBody.clientWidth;
  }

  _addModalClasses() {
    this.domModalBlock.classList.add(classes.modalBlockActive);
    this.domBackdrop.classList.add(classes.backdropActive);
  }

  _removeLock() {
    this.domBody.style.paddingRight = "";
    this.domBody.style.height = "";
    this.domBody.style.overflow = "";
  }

  _removeModalClasses() {
    this.domModalBlock.classList.remove(classes.modalBlockActive);
    this.domBackdrop.classList.remove(classes.backdropActive);
  }

  _dispatchEvent(name) {
    const event = new CustomEvent(name, { bubbles: true });
    this.domModalBlock.dispatchEvent(event);
  }
}
