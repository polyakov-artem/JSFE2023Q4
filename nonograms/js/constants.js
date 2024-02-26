export const classes = {
  game: "game",
  gameMain: "game__main",
  gameSelectorOpen: "game_selector-open",
  gameTimer: "game__timer",
  gameTitle: "game__title",
  gameControls: "game__controls",
  header: "header",
  table: "table",
  tableCell: "table__cell",
  tableRow: "table__row",
  gameTable: "game__table",
  freeSpace: "free-space",
  vHints: "v-hints",
  vHintsColumn: "v-hints__column",
  vHintsCell: "v-hints__cell",
  hHints: "h-hints",
  tableRow: "table__row",
  hHintsRow: "h-hints__row",
  hHintsCell: "h-hints__cell",
  field: "field",
  fieldRow: "field__row",
  fieldCell: "field__cell",
  fieldCellChecked: "field__cell_checked",
  fieldCellCrossed: "field__cell_crossed",
  btn: "btn",
  soundBtn: "sound-btn",
  soundBtnOff: "sound-btn_sound-off",
  gameBtn: "game-btn",
  resetGameBtn: "reset-game-btn",
  randomGameBtn: "random-game-btn",
  saveGameBtn: "save-game-btn",
  loadGameBtn: "load-game-btn",
  solveGameBtn: "solve-game-btn",
  showRecordsBtn: "show-records-btn",
  selector: "selector",
  selectorActive: "selector_active",
  selectorHamburger: "selector__hamburger",
  selectorHabmurgerBox: "selector__hamburger-box",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  selectorTitle: "selector__title",
  selectorInner: "selector__inner",
  selectorSecton: "selector__secton",
  selectorSubtitle: "selector__subtitle",
  list: "list",
  listItem: "list__item",
  listLink: "list__link",
  listImg: "list__img",
  listWrap: "list__wrap",
  listTitle: "list__title",
  listFieldSize: "list__field-size",
  dialog: "dialog",
  dialogTitle: "dialog__title",
  winDialog: "win-dialog",
  results: "results",
  resultsHeader: "results__header",
  resultsCell: "results__cell",
  resultsImg: "results__img",
};

export const data = {
  levels: {
    easy: [
      {
        name: "camel",
        img: "./assets/img/5x5/camel.png",
        fieldSize: "5 x 5",
        level: "easy",
        table: [
          [0, 0, 0, 1, 1],
          [0, 1, 0, 1, 0],
          [1, 1, 1, 1, 0],
          [1, 0, 1, 0, 0],
          [1, 0, 1, 0, 0],
        ],
      },
      {
        name: "cat",
        img: "./assets/img/5x5/cat.png",
        fieldSize: "5 x 5",
        level: "easy",
        table: [
          [0, 0, 1, 0, 1],
          [0, 0, 1, 1, 1],
          [0, 1, 1, 1, 1],
          [1, 1, 1, 1, 0],
          [1, 1, 1, 1, 1],
        ],
      },
      {
        name: "heart",
        img: "./assets/img/5x5/heart.png",
        fieldSize: "5 x 5",
        level: "easy",
        table: [
          [0, 1, 0, 1, 0],
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1],
          [0, 1, 1, 1, 0],
          [0, 0, 1, 0, 0],
        ],
      },
      {
        name: "hourglass",
        img: "./assets/img/5x5/hourglass.png",
        fieldSize: "5 x 5",
        level: "easy",
        table: [
          [1, 1, 1, 1, 1],
          [0, 1, 1, 1, 0],
          [0, 0, 1, 0, 0],
          [0, 1, 0, 1, 0],
          [1, 1, 1, 1, 1],
        ],
      },
      {
        name: "tower",
        img: "./assets/img/5x5/tower.png",
        fieldSize: "5 x 5",
        level: "easy",
        table: [
          [1, 0, 1, 0, 1],
          [0, 1, 1, 1, 0],
          [0, 1, 1, 1, 0],
          [0, 1, 0, 1, 0],
          [1, 1, 1, 1, 1],
        ],
      },
    ],
    medium: [
      {
        name: "alarm clock",
        img: "./assets/img/10x10/alarm_clock.png",
        fieldSize: "10 x 10",
        level: "medium",
        table: [
          [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
          [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
          [1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
          [0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
          [0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
          [0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
          [0, 1, 1, 0, 1, 1, 1, 1, 1, 0],
          [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
          [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        ],
      },
      {
        name: "cherry",
        img: "./assets/img/10x10/cherry.png",
        fieldSize: "10 x 10",
        level: "medium",
        table: [
          [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
          [0, 0, 1, 1, 1, 1, 0, 1, 0, 0],
          [0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
          [1, 1, 1, 0, 0, 1, 0, 1, 1, 1],
          [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
          [0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
          [0, 1, 1, 0, 1, 1, 1, 0, 1, 1],
          [0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
          [0, 1, 0, 0, 0, 1, 1, 0, 1, 1],
          [0, 0, 1, 1, 1, 0, 1, 1, 1, 0],
        ],
      },
      {
        name: "cup",
        img: "./assets/img/10x10/cup.png",
        fieldSize: "10 x 10",
        level: "medium",
        table: [
          [0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
          [0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
          [0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
          [0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
          [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
          [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
          [1, 0, 1, 1, 1, 1, 1, 0, 0, 1],
          [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        ],
      },
      {
        name: "leaf",
        img: "./assets/img/10x10/leaf.png",
        fieldSize: "10 x 10",
        level: "medium",
        table: [
          [0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
          [0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
          [0, 0, 1, 1, 0, 1, 0, 1, 1, 1],
          [0, 1, 0, 1, 0, 1, 1, 0, 0, 1],
          [0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
          [0, 1, 0, 1, 1, 0, 0, 0, 1, 0],
          [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
          [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
          [0, 1, 0, 1, 1, 1, 1, 0, 0, 0],
          [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
      },
      {
        name: "tree",
        img: "./assets/img/10x10/tree.png",
        fieldSize: "10 x 10",
        level: "medium",
        table: [
          [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
          [0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
          [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
          [1, 1, 0, 1, 1, 1, 0, 0, 1, 1],
          [1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
          [0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
          [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
          [0, 1, 0, 0, 1, 1, 0, 0, 0, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
      },
    ],
    hard: [
      {
        name: "bull",
        img: "./assets/img/15x15/bull.png",
        fieldSize: "15 x 15",
        level: "hard",
        table: [
          [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
          [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
          [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
          [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0],
          [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
          [0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
      },
      {
        name: "deer",
        img: "./assets/img/15x15/deer.png",
        fieldSize: "15 x 15",
        level: "hard",
        table: [
          [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
          [1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1],
          [0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1],
          [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
          [0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
          [0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
          [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
          [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        ],
      },
      {
        name: "drink",
        img: "./assets/img/15x15/drink.png",
        fieldSize: "15 x 15",
        level: "hard",
        table: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
          [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1],
          [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        ],
      },
      {
        name: "mouse",
        img: "./assets/img/15x15/mouse.png",
        fieldSize: "15 x 15",
        level: "hard",
        table: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
          [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1],
          [0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
          [1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
          [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0],
          [0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1],
          [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
          [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1],
          [0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
          [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
          [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0],
        ],
      },
      {
        name: "panda",
        img: "./assets/img/15x15/panda.png",
        fieldSize: "15 x 15",
        level: "hard",
        table: [
          [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
          [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
          [0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
          [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
          [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
          [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
          [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
          [0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
          [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
          [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
          [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
          [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0],
          [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0],
          [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        ],
      },
    ],
  },
};