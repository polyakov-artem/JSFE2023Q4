import { createDomElement } from "./utils.js";

const classes = {
  hamburger: "hamburger",
  hamburgerBox: "hamburger__box",
  hamburgerInner: "hamburger__inner",
  hamburgerTypeSlider: "hamburger_type_slider",
  hamburgerActive: "hamburger_active",
};

export class Hamburger {
  constructor() {
    Hamburger.bindEvents();
    return Hamburger.create();
  }

  static bindEvents() {
    if (Hamburger.binded) return;

    document.addEventListener("click", (e) => {
      const toggler = e.target.closest(`.${classes.hamburger}`);
      if (!toggler) return;
      toggler.classList.toggle(classes.hamburgerActive);
    });

    Hamburger.binded = true;
  }

  static create() {
    const hamburger = createDomElement({
      tag: "button",
      classes: [classes.hamburger, classes.hamburgerTypeSlider],
    });

    const hamburgerBox = createDomElement({
      tag: "span",
      classes: classes.hamburgerBox,
    });
    const hamburgerInner = createDomElement({
      tag: "span",
      classes: classes.hamburgerInner,
    });

    hamburger.append(hamburgerBox);
    hamburgerBox.append(hamburgerInner);
    return hamburger;
  }
}
