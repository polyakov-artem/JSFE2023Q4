// import './score.js'
import {Header} from './header.js'

const CLASS_HEADER = "header"

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(`.${CLASS_HEADER}`).forEach((element) => {
      new Header(element);
    });
})