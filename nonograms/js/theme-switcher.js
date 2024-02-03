import { createDomElement } from "./utils.js";

const classes = {
  switcher: "theme-switcher",
  checkbox: "theme-switcher__checkbox",
  switch: "theme-switcher__switch",
  slider: "theme-switcher__slider",
  text: "theme-switcher__text",
  lightTheme: "light-theme",
  darkTheme: "dark-theme",
};

export class ThemeSwitcher {
  constructor() {
    const theme = localStorage.getItem("theme") || "light";
    const checkbox = document.querySelector(`.${classes.checkbox}`);

    let checked = false;

    if (theme === "light") {
      ThemeSwitcher.setLightTheme();
    } else {
      checked = true;
      ThemeSwitcher.setDarkTheme();
    }

    ThemeSwitcher.bindEvents();
    return ThemeSwitcher.create(checked);
  }

  static bindEvents() {
    if (ThemeSwitcher.binded) return;

    document.addEventListener("click", (e) => {
      const switcher = e.target.closest(`.${classes.switcher}`);
      if (!switcher) return;
      const checkbox = switcher.querySelector(`.${classes.checkbox}`);

      checkbox.checked
        ? ThemeSwitcher.setDarkTheme()
        : ThemeSwitcher.setLightTheme();
    });

    ThemeSwitcher.binded = true;
  }

  static create(checked) {
    const container = createDomElement({ classes: classes.switcher });
    const checkbox = createDomElement({
      tag: "input",
      classes: classes.checkbox,
      attr: {
        type: "checkbox",
        id: "theme-switch",
      },
    });
    checkbox.checked = checked;

    const label = createDomElement({
      tag: "label",
      classes: classes.switch,
    });
    const slider = createDomElement({ classes: classes.slider });
    const text = createDomElement({
      tag: "span",
      classes: classes.text,
      text: "Dark theme",
    });

    container.append(label);
    label.append(checkbox, slider, text);
    return container;
  }

  static setDarkTheme() {
    document.body.classList.remove(classes.lightTheme);
    document.body.classList.add(classes.darkTheme);
    localStorage.setItem("theme", "dark");
  }

  static setLightTheme() {
    document.body.classList.remove(classes.darkTheme);
    document.body.classList.add(classes.lightTheme);
    localStorage.setItem("theme", "light");
  }
}
