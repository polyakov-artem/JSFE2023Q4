const CLASS_MODAL_BLOCK= "modal-block";
const CLASS_MODAL_WINDOW = "modal-block__window";
const CLASS_MODAL_ACTIVE = "modal-block_active";

const CLASS_OVERLAY = "backdrop";
const CLASS_OVERLAY_ACTIVE = "backdrop_active";
const CLASS_OVERLAY_VISIBLE = "backdrop_visible";

const SELECTOR_OPEN_BTN = `[data-action="open-modal"]`;
const SELECTOR_CLOSE_BTN = `[data-action="close-modal"]`;

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
  }

  close() {
    this._addAnimationEndHandler();
    this._removeModalClasses();
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
    this.overlay.classList.add(CLASS_OVERLAY_VISIBLE);
    this.overlay.classList.add(CLASS_OVERLAY_ACTIVE);
  }
  
  _removeModalClasses() {
    this.modal.classList.remove(CLASS_MODAL_ACTIVE);
    this.overlay.classList.remove(CLASS_OVERLAY_VISIBLE);
  }
  
  _addAnimationEndHandler(){
    this.overlay.addEventListener("transitionend", ()=>{
      this.overlay.classList.remove(CLASS_OVERLAY_ACTIVE);
      this.body.style.paddingRight = "";
      this.body.style.height = "";
      this.body.style.overflow = "";
    }, { once: true });
  }
}
