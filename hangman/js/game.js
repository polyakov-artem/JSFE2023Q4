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
      this._createDomHeader();
      this._createDomMain();

      this.domKeyboard = document.querySelector("." + classes.keyboard);
      this.domCanvas = document.querySelector("." + classes.canvas);
      this.domGuessesLeft = document.querySelector("." + classes.guessesLeft);
      this.domDialogTitle = document.querySelector("." + classes.dialogTitle);
      this.domHint = document.querySelector("." + classes.hint);
      this.domDialogSecretWord = document.querySelector(
        "." + classes.dialogSecretWord
      );
      this.domCounterCurrent = document.querySelector(
        "." + classes.counterCurrent
      );
    } else {
      this._hideBodyParts();
      this._updateWord();
      this._updateHint();
      this._updateGuesses();
      this._updateKeyboard();
      this._updateModal();
      this._updateHeader();
    }

    this.domWord = document.querySelector("." + classes.word);
    this.domLetters = this.domWord.querySelectorAll("." + classes.letter);
    console.log("Секретное слово: ", this._word);
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

  _createDomHeader() {
    const header = createDomElement({
      tag: "header",
      classes: classes.header,
    });

    const counter = createDomElement({
      tag: "p",
      classes: [classes.counter, classes.headerCounter],
    });

    const counterText = createDomElement({
      tag: "span",
      classes: classes.counterText,
      text: `Слово: `,
    });

    const counterCurrent = createDomElement({
      tag: "span",
      classes: classes.counterCurrent,
      text: `${this._wordNumber} / ${this._words.length}`,
    });

    const gameBtnWrap = createDomElement({
      classes: classes.gameBtnWrap,
    });

    const newGameBtn = this._createNewGameBtn();

    header.append(counter, gameBtnWrap);
    gameBtnWrap.append(newGameBtn);
    counter.append(counterText, counterCurrent);
    document.querySelector("body").prepend(header);
  }

  _createDomMain() {
    const main = createDomElement({ tag: "main", classes: classes.main });
    const canvasColumn = createDomElement({
      classes: classes.canvasColumn,
    });

    const canvas = this._createDomCanvas();

    const mainTitle = createDomElement({
      tag: "h1",
      classes: [classes.h1, classes.mainTitle],
      text: "Hangman Game",
    });

    const wordColumn = createDomElement({ classes: classes.wordColumn });
    const word = this._createDomWord();

    const hint = createDomElement({
      tag: "p",
      classes: [classes.hint, classes.mainHint],
      text: this._hint,
    });

    const guesses = createDomElement({
      tag: "p",
      classes: [classes.guesses, classes.mainGuesses],
    });

    const guessesText = createDomElement({
      tag: "span",
      classes: classes.guessesText,
      text: `Осталось попыток: `,
    });

    const guessesLeft = createDomElement({
      tag: "span",
      classes: classes.guessesLeft,
      text: `${this._attemptsLeft} / ${this._maxAttempts}`,
    });

    const keyboard = this._createDomKeyboard();

    main.append(canvasColumn, wordColumn);
    canvasColumn.append(mainTitle, canvas);
    wordColumn.append(hint, word, guesses, keyboard);
    guesses.append(guessesText, guessesLeft);
    document.querySelector(classes.header).after(main);
  }

  _createDomCanvas() {
    const canvas = createDomElement({
      classes: [classes.canvas, classes.mainCanvas],
    });

    for (let key in canvasImages) {
      const { attr, classes } = canvasImages[key];
      const domImg = createDomElement({
        tag: "img",
        classes: classes,
        attr: attr,
      });

      canvas.append(domImg);
    }

    return canvas;
  }

  _createDomWord() {
    const word = createDomElement({
      classes: [classes.word, classes.mainWord],
    });

    for (let char of this._word) {
      const letter = createDomElement({
        tag: "span",
        classes: classes.letter,
      });
      word.append(letter);
    }

    return word;
  }

  _createDomKeyboard() {
    const keyboard = createDomElement({ classes: classes.keyboard });

    for (let letter of rusLetters) {
      const keyboardBtn = createDomElement({
        tag: "button",
        classes: [classes.btn, classes.keyboardBtn],
        attr: { "data-key": letter },
      });

      const keyboardBtnInner = createDomElement({
        classes: classes.keyboardBtnInner,
        text: letter,
      });

      keyboardBtn.append(keyboardBtnInner);
      keyboard.append(keyboardBtn);
    }

    return keyboard;
  }

  _hideBodyParts() {
    this.domCanvas
      .querySelectorAll("." + classes.canvasBodyPart)
      .forEach((part) => part.classList.remove(classes.canvasBodyPartShown));
  }

  _updateWord() {
    this.domWord.replaceWith(this._createDomWord());
  }

  _updateHint() {
    this.domHint.textContent = `${this._hint}`;
  }

  _updateGuesses() {
    this.domGuessesLeft.textContent = `${this._attemptsLeft} / ${this._maxAttempts}`;
  }
  _updateKeyboard() {
    this.domKeyboard
      .querySelectorAll("." + classes.keyboardBtn)
      .forEach((key) => {
        key.classList.remove(classes.keyboardBtnDisabled);
        key.disabled = false;
      });
  }

  _updateModal({ title = "", word = "" } = {}) {
    this.domDialogTitle.textContent = title;
    this.domDialogSecretWord.textContent = `Секретное слово: ${word}`;
  }

  _updateHeader() {
    this.domCounterCurrent.textContent = `${this._wordNumber} / ${this._words.length}`;
  }

  _bindEvents() {
    document.addEventListener("keydown", this._keyDownHandler.bind(this));
    document.addEventListener("click", this._clickHandler.bind(this));
  }

  _clickHandler(e) {
    const domKey = e.target.closest("." + classes.keyboardBtn);
    if (!domKey) return;

    const isNewGameBtn = domKey.classList.contains(classes.newGameBtn);

    if (isNewGameBtn) {
      this.startNewGame();
    } else {
      if (!this._playing) return;
      this.guess(domKey.dataset.key);
    }
  }

  _keyDownHandler(e) {
    if (!this._playing) return;
    let letter = e.key.toLowerCase();
    if (letter in engLetters) letter = engLetters[letter];

    const domKey = this.domKeyboard.querySelector(`[data-key="${letter}"`);
    if (!domKey || domKey.disabled) return;

    this.guess(letter);
  }

  guess(letter) {
    if (!this._openedLetters.includes(letter) && this._word.includes(letter)) {
      this._openLetter(letter);
    } else {
      this._attemptsLeft -= 1;
      this._updateGuesses();
      this._showPart();
    }

    this._disableButton(letter);
    this._checkState();
  }

  _openLetter(letter) {
    const letterPositions = this._getLetterPositions(letter);
    this._openedLetters.push(letter);

    letterPositions.forEach((index) => {
      this.domLetters[index].textContent = letter;
      this.domLetters[index].classList.add(classes.letterGuessed);
    });
  }

  _getLetterPositions(letter) {
    const regexp = new RegExp(letter, "gi");
    return Array.from(this._word.matchAll(regexp), (item) => item.index);
  }

  _showPart() {
    const domBodyPart = this.domCanvas.querySelector(
      `:nth-child(${this._maxAttempts - this._attemptsLeft + 1})`
    );

    domBodyPart.classList.add(classes.canvasBodyPartShown);
  }

  _disableButton(letter) {
    const domKey = this.domKeyboard.querySelector(`[data-key="${letter}"`);
    domKey.classList.add(classes.keyboardBtnDisabled);
    domKey.disabled = true;
  }

  _checkState() {
    if (this._attemptsLeft == 0) {
      this.endGame();
      return;
    }

    if (this._openedLetters.length === this._wordLetters.size) {
      this.endGame(true);
    }
  }

  endGame(win) {
    this._playing = false;
    const winTitle = "Вы победили!";
    const loseTitle = "Вы проиграли...";
    const title = win ? winTitle : loseTitle;

    this._updateModal({ title, word: this._word });
    this._modalInstance.show();
  }
}
