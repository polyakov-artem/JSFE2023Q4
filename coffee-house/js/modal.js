const CLASS_MODAL_BLOCK= "modal-block";
const CLASS_MODAL_WINDOW = "modal-block__window";
const CLASS_MODAL_ACTIVE = "modal-block_active";

const CLASS_OVERLAY = "backdrop";
const CLASS_OVERLAY_ACTIVE = "backdrop_active";

const SELECTOR_OPEN_BTN = `[data-action="open-modal"]`;
const SELECTOR_CLOSE_BTN = `[data-action="close-modal"]`;

const EVENT_CLOSE_WINDOW = "closeModalWindow"
const EVENT_OPEN_WINDOW = "openModalWindow"

export class Modal {
  constructor() {
    this.body = document.querySelector("body");
    this.overlay = this.body.querySelector(`.${CLASS_OVERLAY}`);
    this.modal = this.body.querySelector(`.${CLASS_MODAL_BLOCK}`);

    this._bind();
  }

  _bind() {
    document.addEventListener("click", this._clickHandler.bind(this));
  }

  _clickHandler(e) {
    if (!this.modal) return;
    const openBtn = e.target.closest(SELECTOR_OPEN_BTN);
    const closeBtn = e.target.closest(SELECTOR_CLOSE_BTN);
    const modalWindow = e.target.closest(`.${CLASS_MODAL_WINDOW}`);

    if (openBtn) {
      e.preventDefault();
      this._open();
      return;
    }

    if (!modalWindow || closeBtn) {
      this.close();
    }
  }

  _open() {
    this._addLock();
    this._addModalClasses();
    this._dispatchEvent(EVENT_OPEN_WINDOW);
  }
  
  _addLock() {
    const scrollWidth = this._getScrollWidth();
    this.body.style.height = "100%";
    this.body.style.overflow = "hidden";
    
    if (scrollWidth) {
      this.body.style.paddingRight = scrollWidth + "px";
    }
  }

  _getScrollWidth() {
    return window.innerWidth - this.body.clientWidth;
  }

  _addModalClasses() {
    this.modal.classList.add(CLASS_MODAL_ACTIVE);
    this.overlay.classList.add(CLASS_OVERLAY_ACTIVE);
  }
  
  close() {
    this._removeLock();
    this._removeModalClasses();
    this._dispatchEvent(EVENT_CLOSE_WINDOW);
  }

  _removeLock(){
    this.body.style.paddingRight = "";
    this.body.style.height = "";
    this.body.style.overflow = "";
  }

  _removeModalClasses() {
    this.modal.classList.remove(CLASS_MODAL_ACTIVE);
    this.overlay.classList.remove(CLASS_OVERLAY_ACTIVE);
  }

  _dispatchEvent(name){
    const event = new CustomEvent(name, {bubbles: true});
    this.modal.dispatchEvent(event);
  }
}
