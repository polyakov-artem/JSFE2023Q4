// import './score.js'
import {Header} from './header.js'
import {Tabs} from './tabs.js'
import {Menu} from './menu.js'
import {Modal} from './modal.js'

const CLASS_HEADER = "header"
const CLASS_TABS = "tabs"
const CLASS_MENU = "menu"

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(`.${CLASS_HEADER}`).forEach((element) => {
      new Header(element);
    });

  document.querySelectorAll(`.${CLASS_TABS}`).forEach((element) => {
    new Tabs(element);
  });

  document.querySelectorAll(`.${CLASS_MENU}`).forEach((element) => {
    new Menu(element);
  });

  new Modal();
})