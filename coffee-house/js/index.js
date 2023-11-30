// import './score.js'
import {Header} from './header.js'
import {Tabs} from './tabs.js'

const CLASS_HEADER = "header"
const CLASS_TABS = "tabs"

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(`.${CLASS_HEADER}`).forEach((element) => {
      new Header(element);
    });

  document.querySelectorAll(`.${CLASS_TABS}`).forEach((element) => {
    new Tabs(element);
  });
})