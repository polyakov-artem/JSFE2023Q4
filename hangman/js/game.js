import {
  classes,
  rusLetters,
  engLetters,
  words,
  canvasImages,
} from "./constants.js";

import { createDomElement, shuffleArray } from "./utils.js";
import { Modal } from "./modal.js";
import { classes as modalClasses } from "./modal-constants.js";

export class Game {
  constructor() {
    this.startNewGame();
    this._bindEvents();
  }

  startNewGame() {
    const isFirstGame = this._wordNumber === undefined;

    if (isFirstGame || this._wordNumber >= this._words.length) {
      this._words = shuffleArray(words);
      this._wordNumber = 1;
    } else {
      this._wordNumber += 1;
    }

    this._word = this._words[this._wordNumber - 1][0];
    this._hint = this._words[this._wordNumber - 1][1];
    this._wordLetters = new Set(this._word);
    this._openedLetters = [];
    this._maxAttempts = 6;
    this._attemptsLeft = this._maxAttempts;
    this._playing = true;

    if (isFirstGame) {
      this._modalInstance = new Modal();
      this._createModalContent();
    }
  }

  _createModalContent() {
    const modalWindow = document.querySelector("." + modalClasses.modalWindow);
    const dialog = createDomElement({ classes: classes.dialog });
    const title = createDomElement({
      tag: "h2",
      classes: [classes.h1, classes.dialogTitle],
    });
    const secretWord = createDomElement({
      tag: "p",
      classes: [classes.dialogSecretWord],
    });

    const newGameBtn = this._createNewGameBtn();
    const gameBtnWrap = createDomElement({
      classes: classes.gameBtnWrap,
    });

    gameBtnWrap.append(newGameBtn);
    dialog.append(title, secretWord, gameBtnWrap);
    modalWindow.append(dialog);
  }

  _createNewGameBtn() {
    const btn = createDomElement({
      tag: "button",
      classes: [
        classes.btn,
        classes.keyboardBtn,
        classes.keyboardBtnArbitrary,
        classes.newGameBtn,
      ],
      attr: {
        "data-action": "close-modal",
      },
    });

    const btnInner = createDomElement({
      classes: classes.keyboardBtnInner,
      text: "Играть заново",
    });

    btn.append(btnInner);

    return btn;
  }

  _bindEvents() {
    document.addEventListener("keydown", this._keyDownHandler.bind(this));
    document.addEventListener("click", this._clickHandler.bind(this));
  }

  _clickHandler(e) {}

  _keyDownHandler(e) {}
}
