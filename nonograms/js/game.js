import { classes, data } from "./constants.js";
import { createDomElement, getRandom, shuffleArray } from "./utils.js";
import { Modal } from "./modal.js";
import { Hamburger } from "./hamburger.js";
import { ThemeSwitcher } from "./theme-switcher.js";
import { sounds } from "./audio.js";

export class Game {
  constructor() {
    this.startNewGame();
    this.bindEvents();
  }

  startNewGame(scheme, moves, timerValue) {
    this.stopTimer();
    this.gameEnded = false;
    this.timerId = null;
    this.timerValue = timerValue || 0;
    this.scheme = scheme || this.getRandomScheme("easy");
    this.soundDisabled = JSON.parse(localStorage.getItem("sound-disabled"));

    this.createDom();
    this.fieldDom = this.getFieldDom();

    this.saveBtnDom = document.querySelector(`.${classes.saveGameBtn}`);
    this.loadBtnDom = document.querySelector(`.${classes.loadGameBtn}`);

    this.timerDom = document.querySelector(`.${classes.gameTimer}`);
    this.winModalDom = document.querySelector(`[data-modal-id="win-modal"]`);
    this.winTitleDom = this.winModalDom.querySelector(
      `.${classes.dialogTitle}`
    );

    if (this.getSavedGame()) {
      this.loadBtnDom.disabled = false;
    } else {
      this.loadBtnDom.disabled = true;
    }

    if (moves) this.writeMoves(moves);
    this.setTimerValue(this.timerValue);
    this.saveBtnDom.disabled = false;

    const soundBtn = document.querySelector(`.${classes.soundBtn}`);
    if (this.soundDisabled) {
      soundBtn.classList.add(classes.soundBtnOff);
    }
  }

  startTimer() {
    this.timerId = setInterval(() => {
      this.setTimerValue(this.timerValue + 1);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerId);
    this.timerId = null;
  }

  createDom() {
    const table = document.querySelector(`.${classes.table}`);

    if (table) {
      table.replaceWith(this.createTableDom());
    } else {
      const game = createDomElement({ classes: classes.game });
      const header = this.createHeaderDom();
      const main = this.createMainDom();
      const selector = this.createSelectorDom();
      game.append(header, selector, main);
      document.body.append(game);
      this.createModalsDom();
    }
  }

  createHeaderDom() {
    const header = createDomElement({ tag: "header", classes: classes.header });
    const themeSwitcher = new ThemeSwitcher();
    const soundBtn = createDomElement({
      tag: "button",
      classes: [classes.btn, classes.soundBtn],
    });
    header.append(themeSwitcher, soundBtn);
    return header;
  }

  createMainDom() {
    const main = createDomElement({ tag: "main", classes: classes.gameMain });
    const title = createDomElement({
      tag: "h1",
      classes: [classes.h1, classes.gameTitle],
      text: "Nonograms",
    });
    const timer = createDomElement({
      tag: "p",
      classes: [classes.h2, classes.gameTimer],
    });
    const table = this.createTableDom();
    const controls = this.createControlsDom();

    main.append(title, timer, table, controls);
    return main;
  }

  createControlsDom() {
    const controls = createDomElement({ classes: classes.gameControls });
    const resetBtn = createDomElement({
      tag: "button",
      classes: [classes.btn, classes.gameBtn, classes.resetGameBtn],
      text: "Reset game",
    });
    const solveBtn = createDomElement({
      tag: "button",
      classes: [classes.btn, classes.gameBtn, classes.solveGameBtn],
      text: "Solve game",
    });
    const randomBtn = createDomElement({
      tag: "button",
      classes: [classes.btn, classes.gameBtn, classes.randomGameBtn],
      text: "Random game",
    });
    const saveBtn = createDomElement({
      tag: "button",
      classes: [classes.btn, classes.gameBtn, classes.saveGameBtn],
      text: "Save game",
    });
    const loadBtn = createDomElement({
      tag: "button",
      classes: [classes.btn, classes.gameBtn, classes.loadGameBtn],
      text: "Load saved game",
    });
    const recordsBtn = createDomElement({
      tag: "button",
      classes: [classes.btn, classes.gameBtn, classes.showRecordsBtn],
      text: "Last wins",
      attr: {
        "data-modal-open": "records-modal",
        "data-modal-control": "",
      },
    });

    controls.append(
      resetBtn,
      solveBtn,
      randomBtn,
      saveBtn,
      loadBtn,
      recordsBtn
    );
    return controls;
  }

  createTableDom() {
    const hHintsArr = this.getHHintsArr();
    const vHintsArr = this.getVHintsArr();
    const colQuantity = this.scheme.table[0].length;
    const rowQuantity = this.scheme.table.length;
    const hHintsQuantity = Math.max(...hHintsArr.map((row) => row.length));
    const vHintsQuantity = Math.max(...vHintsArr.map((row) => row.length));

    const table = createDomElement({
      classes: [classes.table, classes.gameTable],
    });

    const freeSpace = createDomElement({ classes: [classes.freeSpace] });

    const vHints = this.createTablePart({
      container: { classes: [classes.vHints] },
      row: {
        classes: [classes.vHintsColumn],
        quantity: colQuantity,
      },
      cell: {
        classes: [classes.tableCell, classes.vHintsCell],
        quantity: vHintsQuantity,
      },
    });

    const hHints = this.createTablePart({
      container: { classes: [classes.hHints] },
      row: {
        classes: [classes.tableRow, classes.hHintsRow],
        quantity: rowQuantity,
      },
      cell: {
        classes: [classes.tableCell, classes.hHintsCell],
        quantity: hHintsQuantity,
      },
    });

    const field = this.createTablePart({
      container: { classes: [classes.field] },
      row: {
        classes: [classes.tableRow, classes.fieldRow],
        quantity: rowQuantity,
      },
      cell: {
        classes: [classes.tableCell, classes.fieldCell],
        quantity: colQuantity,
      },
    });

    table.append(freeSpace, vHints, hHints, field);
    this.writeHints(table, hHintsArr, vHintsArr);
    return table;
  }

  createTablePart({ container, row, cell }) {
    const domContainer = createDomElement({ classes: container.classes });

    for (let i = 0; i < row.quantity; i++) {
      const domRow = createDomElement({ classes: row.classes });

      for (let j = 0; j < cell.quantity; j++) {
        const domCell = createDomElement({ classes: cell.classes });
        domRow.append(domCell);
      }
      domContainer.append(domRow);
    }
    return domContainer;
  }

  createSelectorDom() {
    const selector = createDomElement({ classes: classes.selector });
    const title = createDomElement({
      tag: "h2",
      classes: [classes.h1, classes.selectorTitle],
      text: "List of games",
    });
    const inner = createDomElement({ classes: classes.selectorInner });

    selector.append(title, inner);

    for (let level in data.levels) {
      const section = createDomElement({ classes: classes.selectorSecton });
      const subtitle = createDomElement({
        tag: "p",
        classes: [classes.h4, classes.selectorSubtitle],
        text: level,
      });
      const list = createDomElement({ tag: "ul", classes: classes.list });

      const schemes = data.levels[level];
      schemes.forEach((scheme) => {
        const listItem = createDomElement({
          tag: "li",
          classes: classes.listItem,
        });
        const link = createDomElement({
          tag: "a",
          classes: classes.listLink,
          attr: {
            href: "#",
            "data-level": level,
            "data-name": scheme.name,
          },
        });
        const img = createDomElement({
          tag: "img",
          classes: classes.listImg,
          attr: {
            src: scheme.img,
            alt: "",
          },
        });
        const listWrap = createDomElement({ classes: classes.listWrap });
        const listTitle = createDomElement({
          tag: "p",
          classes: [classes.h5, classes.listTitle],
          text: scheme.name,
        });
        const fieldSize = createDomElement({
          tag: "p",
          classes: classes.listFieldSize,
          text: `Size: ${scheme.fieldSize}`,
        });

        listItem.append(link);
        link.append(img, listWrap);
        listWrap.append(listTitle, fieldSize);
        list.append(listItem);
      });

      section.append(subtitle, list);
      inner.append(section);
    }

    const hamburgerBox = createDomElement({
      classes: classes.selectorHabmurgerBox,
    });
    const hamburger = new Hamburger();
    hamburger.classList.add(classes.selectorHamburger);
    hamburgerBox.append(hamburger);
    selector.append(hamburgerBox);

    return selector;
  }

  createModalsDom() {
    const winDialog = createDomElement({ classes: [classes.dialog] });
    const winTitle = createDomElement({
      tag: "h2",
      classes: [classes.h2, classes.dialogTitle],
      text: "Great! You have solved the nonogram in ## seconds!",
    });

    winDialog.append(winTitle);
    new Modal({ id: "win-modal", content: winDialog });

    const recordsDialog = createDomElement({ classes: [classes.dialog] });
    const recordsTitle = createDomElement({
      tag: "h2",
      classes: [classes.h2, classes.dialogTitle],
      text: "Last wins",
    });

    const list = this.createResultsList();

    recordsDialog.append(recordsTitle, list);
    new Modal({ id: "records-modal", content: recordsDialog });
  }

  createResultsList() {
    const table = createDomElement({ tag: "table", classes: classes.results });
    const body = createDomElement({ tag: "tbody" });
    const header = createDomElement({
      tag: "tr",
      classes: classes.resultsHeader,
    });
    const headings = ["Image", "Name", "Size", "Level", "Time"];
    for (let heading of headings) {
      header.append(
        createDomElement({
          tag: "th",
          classes: classes.resultsCell,
          text: heading,
        })
      );
    }

    table.append(body);
    body.append(header);

    const results = JSON.parse(localStorage.getItem("game-results"));
    if (!results) return "";

    results.sort((a, b) => a.timerValue - b.timerValue);
    results.forEach((result) => {
      const row = createDomElement({ tag: "tr" });
      const { img, name, fieldSize, level, timerValue } = result;

      for (let key of headings) {
        const cell = createDomElement({
          tag: "td",
          classes: classes.resultsCell,
        });
        switch (key) {
          case "Image":
            const image = createDomElement({
              tag: "img",
              classes: classes.resultsImg,
              attr: {
                src: img,
                alt: "",
              },
            });
            cell.append(image);
            break;
          case "Name":
            cell.textContent = name;
            break;
          case "Size":
            cell.textContent = fieldSize;
            break;
          case "Level":
            cell.textContent = level;
            break;
          case "Time":
            cell.textContent = timerValue + " seconds";
            break;
        }
        row.append(cell);
      }

      body.append(row);
    });

    return table;
  }

  getRandomScheme(level) {
    let currentLevel = level;

    if (!currentLevel) {
      const levels = Object.keys(data.levels);
      currentLevel = levels[getRandom(0, levels.length - 1)];
    }

    const schemesArr = data.levels[currentLevel];
    let nextScheme = null;

    do {
      nextScheme = schemesArr[getRandom(0, schemesArr.length - 1)];
    } while (nextScheme === this.scheme);

    return nextScheme;
  }

  getHHintsArr() {
    return this.scheme.table.map((row) => {
      const rowHints = row
        .join("")
        .split("0")
        .filter((str) => str.length > 0)
        .map((str) => str.length);

      return shuffleArray(rowHints);
    });
  }

  getVHintsArr() {
    let hints = [];
    const table = this.scheme.table;
    const maxColumn = table[0].length - 1;

    for (let i = 0; i <= maxColumn; i++) {
      let colHintsStr = "";
      for (let row of table) {
        colHintsStr += row[i];
      }

      const colHints = colHintsStr
        .split("0")
        .filter((str) => str.length > 0)
        .map((str) => str.length);

      hints.push(shuffleArray(colHints));
    }

    return hints;
  }

  writeMoves(moves) {
    moves.forEach((row, rowIndex) => {
      row.forEach((cellValue, cellIndex) => {
        if (cellValue === 1) {
          this.fieldDom[rowIndex][cellIndex].classList.add(
            classes.fieldCellChecked
          );
        } else if (cellValue === -1) {
          this.fieldDom[rowIndex][cellIndex].classList.add(
            classes.fieldCellCrossed
          );
        }
      });
    });
  }

  setTimerValue(timerValue) {
    this.timerValue = timerValue;
    const minutes = String(Math.floor(timerValue / 60)).padStart(2, "0");
    const seconds = String(timerValue - minutes * 60).padStart(2, "0");
    this.timerDom.textContent = `${minutes}:${seconds}`;
  }

  getFieldDom() {
    const fieldDom = [];

    document.querySelectorAll(`.${classes.fieldRow}`).forEach((row) => {
      fieldDom.push([...row.children]);
    });
    return fieldDom;
  }

  bindEvents() {
    document.addEventListener("click", this.clickHandler.bind(this));
    document.addEventListener("contextmenu", this.clickHandler.bind(this));
  }

  clickHandler(e) {
    const randomGameBtn = e.target.closest(`.${classes.randomGameBtn}`);
    if (randomGameBtn) {
      this.startNewGame(this.getRandomScheme());
      return;
    }

    const loadGameBtn = e.target.closest(`.${classes.loadGameBtn}`);
    if (loadGameBtn) {
      const data = this.getSavedGame();
      if (data) this.startNewGame(data.scheme, data.moves, data.timerValue);
      return;
    }

    const resetGameBtn = e.target.closest(`.${classes.resetGameBtn}`);
    if (resetGameBtn) {
      this.resetGame();
      return;
    }

    const solveGameBtn = e.target.closest(`.${classes.solveGameBtn}`);
    if (solveGameBtn) {
      this.solveGame();
      return;
    }

    const saveGameBtn = e.target.closest(`.${classes.saveGameBtn}`);
    if (saveGameBtn) {
      this.saveGame();
      return;
    }

    const cell = e.target.closest(`.${classes.fieldCell}`);
    if (cell) {
      this.cellClickHandler(e, cell);
      return;
    }

    const hamburger = e.target.closest(`.${classes.selectorHamburger}`);
    if (hamburger) {
      document
        .querySelector(`.${classes.game}`)
        .classList.toggle(classes.gameSelectorOpen);
      return;
    }

    const soundBtn = e.target.closest(`.${classes.soundBtn}`);
    if (soundBtn) {
      this.soundDisabled = !this.soundDisabled;
      localStorage.setItem(
        "sound-disabled",
        JSON.stringify(this.soundDisabled)
      );
      soundBtn.classList.toggle(classes.soundBtnOff);
      return;
    }

    const listLink = e.target.closest(`.${classes.listLink}`);
    if (listLink) {
      e.preventDefault();
      const level = listLink.getAttribute("data-level");
      const name = listLink.getAttribute("data-name");
      const scheme = data.levels[level].filter(
        (scheme) => scheme.name === name
      )[0];
      this.startNewGame(scheme);
      return;
    }
  }

  solveGame() {
    this.endGame();
    this.clearField();

    this.scheme.table.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const domCell = this.fieldDom[rowIndex][cellIndex];
        if (!!cell) domCell.classList.add(classes.fieldCellChecked);
      });
    });
  }

  saveGame() {
    const data = {
      scheme: this.scheme,
      timerValue: this.timerValue,
      moves: this.getMoves(),
    };

    localStorage.setItem("game-save", JSON.stringify(data));
    this.loadBtnDom.disabled = false;
  }

  getSavedGame() {
    return JSON.parse(localStorage.getItem("game-save"));
  }

  getMoves() {
    return this.fieldDom.map((row) => {
      return row.map((cell) => {
        if (cell.classList.contains(classes.fieldCellChecked)) return 1;
        if (cell.classList.contains(classes.fieldCellCrossed)) return -1;
        return 0;
      });
    });
  }

  resetGame() {
    this.gameEnded = false;
    this.saveBtnDom.disabled = false;
    this.clearField();
    this.stopTimer();
    this.setTimerValue(0);
  }

  clearField() {
    document
      .querySelectorAll(`.${classes.fieldCellChecked}`)
      .forEach((cell) => {
        cell.classList.remove(classes.fieldCellChecked);
      });

    document
      .querySelectorAll(`.${classes.fieldCellCrossed}`)
      .forEach((cell) => {
        cell.classList.remove(classes.fieldCellCrossed);
      });
  }

  writeHints(table, hHintsArr, vHintsArr) {
    table.querySelectorAll(`.${classes.hHintsRow}`).forEach((row, rowIndex) => {
      const domCells = [...row.children].reverse();
      hHintsArr[rowIndex].forEach(
        (hint, index) => (domCells[index].textContent = hint)
      );
    });

    table
      .querySelectorAll(`.${classes.vHintsColumn}`)
      .forEach((col, colIndex) => {
        const domCells = [...col.children].reverse();
        vHintsArr[colIndex].forEach(
          (hint, index) => (domCells[index].textContent = hint)
        );
      });
  }

  cellClickHandler(e, cell) {
    e.preventDefault();
    if (this.gameEnded) return;
    if (!this.timerId) this.startTimer();

    const isRightButton = e.button == 2;

    if (isRightButton) {
      cell.classList.remove(classes.fieldCellChecked);
      cell.classList.add(classes.fieldCellCrossed);
      if (!this.soundDisabled) sounds.cross.play();
    } else {
      cell.classList.remove(classes.fieldCellCrossed);
      cell.classList.toggle(classes.fieldCellChecked);
      if (!this.soundDisabled) sounds.check.play();
    }

    this.checkState();
  }

  checkState() {
    if (this.isSolved()) {
      this.endGame(true);
    }
  }

  isSolved() {
    return this.scheme.table.every((row, rowIndex) => {
      return row.every((cell, cellIndex) => {
        const domCell = this.fieldDom[rowIndex][cellIndex];
        return (
          !!cell === !!domCell.classList.contains(classes.fieldCellChecked)
        );
      });
    });
  }

  endGame(win) {
    this.stopTimer();
    this.gameEnded = true;

    if (win) {
      this.saveResult();
      this.winTitleDom.textContent = `Great! You have solved the nonogram in ${this.timerValue} seconds!`;
      document
        .querySelector(`.${classes.results}`)
        .replaceWith(this.createResultsList());
      Modal.open(this.winModalDom);
      if (!this.soundDisabled) sounds.win.play();
    }

    this.saveBtnDom.disabled = true;
  }

  saveResult() {
    const result = {
      timerValue: this.timerValue,
      name: this.scheme.name,
      level: this.scheme.level,
      img: this.scheme.img,
      fieldSize: this.scheme.fieldSize,
    };

    let lastResults = JSON.parse(localStorage.getItem("game-results"));

    if (!lastResults) {
      lastResults = [result];
    } else {
      lastResults.unshift(result);
      if (lastResults.length > 5) lastResults.length = 5;
    }

    localStorage.setItem("game-results", JSON.stringify(lastResults));
  }
}
