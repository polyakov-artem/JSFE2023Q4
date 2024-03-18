export const classes = {
  header: "header",
  counter: "counter",
  headerCounter: "header__counter",
  counterText: "counter__text",
  counterCurrent: "counter__current",
  newGameBtn: "new-game-btn",
  gameBtnWrap: "game-btn-wrap",
  keyboardBtnArbitrary: "keyboard-btn_arbitrary",
  main: "main",
  canvasColumn: "main__canvas-column",
  canvas: "canvas",
  mainCanvas: "main__canvas",
  canvasImg: "canvas__img",
  canvasScaffold: "canvas__scaffold",
  canvasBodyPart: "canvas__body-part",
  canvasBodyPartShown: "canvas__body-part_shown",
  h1: "h1",
  mainTitle: "main__title",
  wordColumn: "main__word-column",
  word: "word",
  mainWord: "main__word",
  letter: "word__letter",
  letterGuessed: "word__letter_guessed",
  hint: "hint",
  mainHint: "main__hint",
  guesses: "guesses",
  mainGuesses: "main__guesses",
  guessesText: "guesses__text",
  guessesCounter: "guesses__counter",
  keyboard: "keyboard",
  btn: "btn",
  keyboardBtn: "keyboard-btn",
  keyboardBtnDisabled: "keyboard-btn_disabled",
  keyboardBtnInner: "keyboard-btn__inner",
  dialog: "dialog",
  dialogTitle: "dialog__title",
  dialogSecretWord: "dialog__secret-word",
};

export const canvasImages = {
  scaffold: {
    attr: { src: "./assets/img/scaffold.png", alt: "Эшафот" },
    classes: [classes.canvasImg, classes.canvasScaffold],
  },
  head: {
    attr: { src: "./assets/img/head.png", alt: "Голова" },
    classes: [classes.canvasImg, classes.canvasBodyPart],
  },
  body: {
    attr: { src: "./assets/img/body.png", alt: "Тело" },
    classes: [classes.canvasImg, classes.canvasBodyPart],
  },
  left_arm: {
    attr: { src: "./assets/img/left_arm.png", alt: "Левая рука" },
    classes: [classes.canvasImg, classes.canvasBodyPart],
  },
  right_arm: {
    attr: { src: "./assets/img/right_arm.png", alt: "Правая рука" },
    classes: [classes.canvasImg, classes.canvasBodyPart],
  },
  left_foot: {
    attr: { src: "./assets/img/left_foot.png", alt: "Левая нога" },
    classes: [classes.canvasImg, classes.canvasBodyPart],
  },
  right_foot: {
    attr: { src: "./assets/img/right_foot.png", alt: "Правая нога" },
    classes: [classes.canvasImg, classes.canvasBodyPart],
  },
};

export const engLetters = {
  f: "а",
  ",": "б",
  d: "в",
  u: "г",
  l: "д",
  t: "е",
  ";": "ж",
  p: "з",
  b: "и",
  q: "й",
  r: "к",
  k: "л",
  v: "м",
  y: "н",
  j: "о",
  g: "п",
  h: "р",
  c: "с",
  n: "т",
  e: "у",
  a: "ф",
  "[": "х",
  w: "ц",
  x: "ч",
  i: "ш",
  o: "щ",
  "]": "ъ",
  s: "ы",
  m: "ь",
  "'": "э",
  ".": "ю",
  z: "я",
};

export const rusLetters = Object.values(engLetters);

export const words = [
  ["человек", "животное, способное резервивовать и сообщать опыт"],
  ["ребенок", "на грязный пол ... ничего не будет разливать и рассыпать"],
  ["система", "целое, составленное из частей"],
  [
    "женщина",
    "Этот китайский иероглиф, повторенный дважды, означает «ссора», трижды - «интрига», а каково его значение в одиночном написании?",
  ],
  ["проблема", "Есть человек - есть она, нет человека - нет ее"],
  ["решение", "то, на что мы отваживаемся, если не можем создать комиссию"],
  [
    "история",
    "Согласно афоризму В.Меркулова, ее колесо - единственное, в которое не вставишь палку",
  ],
  ["компания", "маленькая хранительница большого секрета в песне"],
  ["процесс", "при Брежневе он стоял, а при Горбачеве — пошел"],
  ["качество", "Это не трепачество, а борьба за ..."],
  ["действие", "«драма» в переводе с греческого"],
  [
    "государство",
    "что означает китайский иероглиф, изображающий человека с копьем и ограду",
  ],
  [
    "общество",
    "цивилизованная орда, состоящая из двух могущественных племен: надоедающих и скучающих. Джордж Байрон",
  ],
  ["порядок", "целенаправленная суета"],
  ["ситуация", "совокупность обстоятельств"],
  ["внимание", "состояние человека"],
  ["предприятие", "Задуманное дело"],
  ["информация", "Совокупность данных"],
  ["интерес", "что пробуждает аппетит к предмету"],
  ["правило", "инструмент для штукатурных работ"],
  ["материал", "«сырье» для будущей книги"],
  ["товарищ", "гусь гусю, если игнорировать свинью"],
  ["культура", "просвещенность, образованность, начитанность"],
  ["директор", "первый парень на заводе"],
  ["очередь", "длинный хвост"],
  ["событие", "незаурядный факт"],
  ["искусство", "чему покровительствовал Аполлон?"],
  ["начальник", "страшно, когда он злой"],
  ["принцип", "степень компромисса с действительностью"],
  ["характер", "Посеешь привычку - пожнешь ..."],
  ["мальчик", "«гарсон» в переводе с французского"],
  [
    "представитель",
    "типичный образец того или иного разряда существ, предметов",
  ],
  ["политика", "грязное дело"],
  ["рисунок", "совокупность графических элементов"],
  ["свобода", "когда дышится легко"],
  ["природа", "что коту Матроскину заменил телевизор"],
  ["телефон", "виселица болтушки"],
  [
    "самолет",
    "очертание этого транспортного средства напоминает современная столица Бразилии",
  ],
  ["специалист", "тот, кто знает все о немногом и ничего обо всем остальном"],
  [
    "господин",
    "кто способен предвидеть и предусматривать, тот и ... (Аристотель)",
  ],
  ["надежда", "отсроченное разочарование"],
  ["вариант", "один из путей решения"],
  ["министр", "чиновник с портфелем"],
  ["операция", "резня"],
  ["счастье", "когда все дома"],
  ["магазин", "Продажное заведение"],
  ["строительство", "Отрасль промышленности"],
  ["содержание", "Элемент издания"],
  ["радость", ".. прямит, беда крючит"],
  ["комплекс", "цикл упражнений"],
  ["реформа", "преобразование"],
  ["будущее", "Постоянное завтра"],
  ["техника", "Это не ... дошла, это я сама сюда дошла"],
  ["необходимость", "нужда"],
  ["деревня", "Вот моя ..., вот мой дом родной"],
  ["элемент", "составная часть сложного целого"],
  ["обстоятельство", "Второстепенный член предложения"],
  ["источник", "струя жидкости"],
  ["функция", "Тангенс по сути"],
  ["работник", "Тот, кто убивает время за деньги"],
];