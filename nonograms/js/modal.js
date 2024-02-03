import { createDomElement } from "./utils.js";

export const classes = {
  modalBlock: "modal-block",
  modalBlockActive: "modal-block_active",
  modalWindow: "modal-block__window",
};

export const attributes = {
  control: `data-modal-control`,
  open: `data-modal-open`,
  close: `data-modal-close`,
  modal: `data-modal-id`,
};

export const events = {
  closeWindow: "closeModalWindow",
  openWindow: "openModalWindow",
};

export class Modal {
  constructor(props = {}) {
    const { attrName = attributes.modal, id = "modal", content = "" } = props;
    const selector = `[${attrName}="${id}"]`;

    const domModalBlock = document.querySelector(selector);

    if (!domModalBlock) {
      Modal.createDom(attrName, id, content);
    }

    if (!Modal.eventsBinded) Modal.bindEvents();
  }

  static createDom(attrName, id, content) {
    const modalBlock = createDomElement({
      classes: classes.modalBlock,
      attr: { [attrName]: id },
    });
    const modalWindow = createDomElement({ classes: classes.modalWindow });
    modalWindow.append(content);
    modalBlock.append(modalWindow);
    document.body.querySelector("script").before(modalBlock);
  }

  static bindEvents() {
    document.addEventListener("click", Modal.clickHandler);
    Modal.eventsBinded = true;
  }

  static clickHandler(e) {
    const isBackdrop = e.target.classList.contains(classes.modalBlock);
    if (isBackdrop) Modal.close(e.target);

    const control = e.target.closest(`[${attributes.control}]`);

    if (!control) return;
    e.preventDefault();

    const isOpenBtn = control.hasAttribute(attributes.open);
    const isCloseBtn = control.hasAttribute(attributes.close);

    const id =
      control.getAttribute(attributes.open) ||
      control.getAttribute(attributes.close);

    const modalWindow = document.querySelector(`[${attributes.modal}="${id}"]`);

    if (!modalWindow) return;

    if (isOpenBtn) {
      document.body
        .querySelectorAll("." + classes.modalBlockActive)
        .forEach((modalWindow) => {
          Modal.close(modalWindow);
        });
      Modal.open(modalWindow);
      return;
    }

    if (isCloseBtn) {
      Modal.close(modalWindow);
    }
  }

  static open(modalWindow) {
    Modal.addLock();
    Modal.addModalClasses(modalWindow);
    Modal.dispatchEvent(modalWindow, events.openWindow);
  }

  static close(modalWindow) {
    Modal.removeLock();
    Modal.removeModalClasses(modalWindow);
    Modal.dispatchEvent(modalWindow, events.closeWindow);
  }

  static addLock() {
    const scrollWidth = Modal.getScrollWidth();
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";

    if (scrollWidth) {
      document.body.style.paddingRight = scrollWidth + "px";
    }
  }

  static getScrollWidth() {
    return window.innerWidth - document.body.clientWidth;
  }

  static addModalClasses(modalWindow) {
    modalWindow.classList.add(classes.modalBlockActive);
  }

  static removeLock() {
    document.body.style.paddingRight = "";
    document.body.style.height = "";
    document.body.style.overflow = "";
  }

  static removeModalClasses(modalWindow) {
    modalWindow.classList.remove(classes.modalBlockActive);
  }

  static dispatchEvent(modalWindow, evntName) {
    const event = new CustomEvent(evntName, { bubbles: true });
    modalWindow.dispatchEvent(event);
  }
}
