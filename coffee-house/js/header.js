const CLASS_BODY_LOCKED = "body-locked";
const CLASS_TOGGLER = "header__toggler";
const CLASS_TOGGLER_ACTIVE = "hamburger_active";
const CLASS_NAV_MENU = "header__nav";

const CLASS_ANIMATION_OPEN = "slideIn";
const CLASS_ANIMATION_CLOSE = "slideOut";

export class Header {
  constructor(element) {
    this.isOpen = false;
    this.header = element;
    this.toggler = element.querySelector(`.${CLASS_TOGGLER}`);
    this.navMenu = element.querySelector(`.${CLASS_NAV_MENU}`);
    this.body = document.querySelector(`body`);
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener("click", this._clickHandler.bind(this));
    window.addEventListener("resize", this.closeMenu.bind(this));
  }

  closeMenu() {
    this.toggler.classList.remove(CLASS_TOGGLER_ACTIVE);
    this.navMenu.classList.remove(CLASS_ANIMATION_OPEN);
    this.navMenu.classList.add(CLASS_ANIMATION_CLOSE);
    this.body.classList.remove(CLASS_BODY_LOCKED);
    this.isOpen = false;
  }
  
  openMenu() {
    this.body.classList.add(CLASS_BODY_LOCKED);
    this.toggler.classList.add(CLASS_TOGGLER_ACTIVE);
    this.navMenu.classList.remove(CLASS_ANIMATION_CLOSE);
    this.navMenu.classList.add(CLASS_ANIMATION_OPEN);
    this.isOpen = true;
  }

  _clickHandler(e) {
    if (e.target.closest(`.${CLASS_TOGGLER}`)) {
      this.isOpen ? this.closeMenu() : this.openMenu();
      return;
    }

    if (this.isOpen) this.closeMenu();
  }
}
