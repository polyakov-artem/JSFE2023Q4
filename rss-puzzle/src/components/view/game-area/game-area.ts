import { NUM_OF_SENTENCES_IN_ROUND, classSelectors, classes } from '../../../common/js/constants';
import { AppModel } from '../../app-model/app-model';
import { App } from '../../app/app';
import { HintController } from '../../controller/hint-controller/hint-controller';
import { createDomElement, getGridStyles, shuffleArray } from '../../utils/utils';
import { Field } from '../field/field';
import { GameButtons } from '../game-buttons/game-buttons';
import { playAudioBtn } from '../play-audio-btn/play-audio-btn';

export class GameArea {
  node!: HTMLElement;
  playBtn!: HTMLElement;
  textHint!: HTMLElement;
  table!: HTMLElement;
  field!: Field;
  gameWords!: HTMLElement;
  rowNumbers!: HTMLElement;
  gameButtons!: GameButtons;
  getNode(): HTMLElement {
    if (!this.node) {
      this.node = this.createNode();
      this.addListeners();
    }
    this.updateView();
    return this.node;
  }

  createNode(): HTMLElement {
    const node = createDomElement({ classNames: [classes.gameArea] });
    this.playBtn = playAudioBtn({ classNames: [classes.gameAudioBtn] });

    this.textHint = createDomElement({ tag: 'p', classNames: [classes.gameTextHint, classes.h4] });
    this.gameButtons = new GameButtons();

    this.table = createDomElement({ classNames: [classes.gameTable] });
    this.rowNumbers = createDomElement({ classNames: [classes.gameRowNumbers] });
    this.field = new Field();

    for (let i = 0; i < NUM_OF_SENTENCES_IN_ROUND; i++) {
      const rowNumber: HTMLElement = createDomElement({ classNames: [classes.gameRowNumber] });
      this.rowNumbers.append(rowNumber);
    }

    this.gameWords = createDomElement({ classNames: [classes.gameWords] });

    node.append(this.playBtn, this.textHint, this.table, this.gameButtons.getNode());
    this.table.append(this.rowNumbers, this.field.getNode(), this.gameWords);

    return node;
  }

  updateHintsState(): void {
    const controller: HintController = App.appController.gameController.hintController;
    const textBtnIsChecked: boolean = controller.getState(classes.textHintBtn);
    const audioBtnIsChecked: boolean = controller.getState(classes.audioHintBtn);
    const imgBtnIsChecked: boolean = controller.getState(classes.imgHintBtn);

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

  updateSentenceRelated(): void {
    const { currentSentenceNumber, currentSentenceAudio, currentSentenceTranslate }: AppModel =
      App.appModel;

    [...this.rowNumbers.children].forEach((element: Element): void =>
      element.classList.remove(classes.gameRowNumberActive),
    );
    this.rowNumbers.children[currentSentenceNumber].classList.add(classes.gameRowNumberActive);

    this.textHint.textContent = currentSentenceTranslate;
    this.playBtn.setAttribute('data-src', currentSentenceAudio);

    this.updateWordsSource();
  }

  updateView(): void {
    this.gameButtons.updateView();
    this.field.updateView();
    this.updateHintsState();
    this.updateSentenceRelated();
    this.updateWordsSource();
  }

  updateWordsSource(): void {
    const words = App.appModel.currentSentenceWords;
    this.gameWords.setAttribute('style', getGridStyles(words));
    this.addWords(this.gameWords, words, true);
  }

  addWords(container: HTMLElement, words: string[], randomize: boolean = false): void {
    container.innerHTML = '';
    if (randomize) words = shuffleArray(words);

    for (const word of words) {
      const wordElement: HTMLElement = createDomElement({ text: word, classNames: [classes.word] });
      container.append(wordElement);
    }
  }

  solveSentence(): void {
    const { currentSentenceNumber, currentSentenceWords }: AppModel = App.appModel;
    const sentenceElement = this.field.getNode().children[currentSentenceNumber] as HTMLElement;
    this.addWords(sentenceElement, currentSentenceWords);
  }

  addListeners(): void {
    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(classSelectors.word)) {
        this.wordClickHandler(target);
      }
    });
  }

  wordClickHandler(wordElement: HTMLElement): void {
    const { currentSentenceNumber, isRoundEnded }: AppModel = App.appModel;

    if (isRoundEnded) return;
    const sourceField: HTMLElement = document.querySelector(classSelectors.gameWords)!;
    const sentenceField: HTMLElement = document.querySelector(
      `[data-sentence="${currentSentenceNumber}"]`,
    )!;
    const checkBtn: HTMLElement = document.querySelector(classSelectors.checkBtn)!;

    if (wordElement.parentElement === sentenceField) {
      sourceField.append(wordElement);
    } else if (wordElement.parentElement === sourceField) {
      checkBtn.setAttribute('disalbed', 'true');
      sentenceField.append(wordElement);
    }

    if (sourceField.children.length === 0) checkBtn.removeAttribute('disabled');
  }

  showResultImg(): void {
    this.gameWords.innerHTML = '';
    this.gameWords.textContent = App.appModel.currentImgCaption;
    this.gameWords.setAttribute('style', `grid-template-columns: 1fr`);
    this.field.showResultImg();
  }
}
