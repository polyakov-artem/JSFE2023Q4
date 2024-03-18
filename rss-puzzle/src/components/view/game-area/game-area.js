import { classSelectors, classes } from '../../../common/js/constants.js';
import { App } from '../../app/app.js';
import { createDomElement, getGridStyles, shuffleArray } from '../../utils/utils.js';
import { Field } from '../field/field.js';
import { GameButtons } from '../game-buttons/game-buttons.js';
import { playAudioBtn } from '../play-audio-btn/play-audio-btn.js';

export class GameArea {
  getNode() {
    if (!this.node) {
      this.node = this.createNode();
      this.addListeners();
    }
    this.updateView();
    return this.node;
  }

  createNode() {
    const node = createDomElement({ classNames: [classes.gameArea] });
    this.playBtn = playAudioBtn({ classNames: [classes.gameAudioBtn] });

    this.textHint = createDomElement({ tag: 'p', classNames: [classes.gameTextHint, classes.h4] });
    this.gameButtons = new GameButtons();

    this.table = createDomElement({ classNames: [classes.gameTable] });
    this.rowNumbers = createDomElement({ classNames: [classes.gameRowNumbers] });
    this.field = new Field();

    for (let i = 0; i < 10; i++) {
      const rowNumber = createDomElement({ classNames: [classes.gameRowNumber] });
      this.rowNumbers.append(rowNumber);
    }

    this.gameWords = createDomElement({ classNames: [classes.gameWords] });

    node.append(this.playBtn, this.textHint, this.table, this.gameButtons.getNode());
    this.table.append(this.rowNumbers, this.field.getNode(), this.gameWords);

    return node;
  }

  updateHintsState() {
    const controller = App.appController.gameController.hintController;
    const textBtnIsChecked = controller.getState(classes.textHintBtn);
    const audioBtnIsChecked = controller.getState(classes.audioHintBtn);
    const imgBtnIsChecked = controller.getState(classes.imgHintBtn);

    textBtnIsChecked
      ? this.textHint.classList.add(classes.gameTextHintActive)
      : this.textHint.classList.remove(classes.gameTextHintActive);

    audioBtnIsChecked
      ? this.playBtn.classList.add(classes.gameAudioBtnActive)
      : this.playBtn.classList.remove(classes.gameAudioBtnActive);

    imgBtnIsChecked
      ? this.table.classList.add(classes.gameTableBgVisible)
      : this.table.classList.remove(classes.gameTableBgVisible);
  }

  updateSentenceRelated() {
    const { currentSentenceNumber, currentSentenceAudio, currentSentenceTranslate } = App.appModel;

    [...this.rowNumbers.children].forEach((element) =>
      element.classList.remove(classes.gameRowNumberActive),
    );
    this.rowNumbers.children[currentSentenceNumber].classList.add(classes.gameRowNumberActive);

    this.textHint.textContent = currentSentenceTranslate;
    this.playBtn.setAttribute('data-src', currentSentenceAudio);

    this.updateWordsSource();
  }

  updateView() {
    this.gameButtons.updateView();
    this.field.updateView();
    this.updateHintsState();
    this.updateSentenceRelated();
    this.updateWordsSource();
  }

  updateWordsSource() {
    const words = App.appModel.currentSentenceWords;
    this.gameWords.style = getGridStyles(words);
    this.addWords(this.gameWords, words, true);
  }

  addWords(container, words, randomize = false) {
    container.innerHTML = '';
    if (randomize) words = shuffleArray(words);

    for (let word of words) {
      const wordElement = createDomElement({ text: word, classNames: [classes.word] });
      container.append(wordElement);
    }
  }

  solveSentence() {
    const { currentSentenceNumber, currentSentenceWords } = App.appModel;
    const sentenceElement = this.field.getNode().children[currentSentenceNumber];
    this.addWords(sentenceElement, currentSentenceWords);
  }

  addListeners() {
    document.addEventListener('click', ({ target }) => {
      if (target.closest(classSelectors.word)) {
        this.wordClickHandler(target);
      }
    });
  }

  wordClickHandler(wordElement) {
    const { currentSentenceNumber, isRoundEnded } = App.appModel;
    if (isRoundEnded) return;
    const sourceField = document.querySelector(classSelectors.gameWords);
    const sentenceField = document.querySelector(`[data-sentence="${currentSentenceNumber}"]`);
    const checkBtn = document.querySelector(classSelectors.checkBtn);

    if (wordElement.parentElement === sentenceField) {
      sourceField.append(wordElement);
    } else if (wordElement.parentElement === sourceField) {
      checkBtn.setAttribute('disalbed', 'true');
      sentenceField.append(wordElement);
    }

    if (sourceField.children.length === 0) checkBtn.removeAttribute('disabled');
  }

  showResultImg() {
    this.gameWords.innerHTML = '';
    this.gameWords.textContent = App.appModel.currentImgCaption;
    this.gameWords.style = `grid-template-columns: 1fr`;
    this.field.showResultImg();
  }
}
