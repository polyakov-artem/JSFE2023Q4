import { Dictionary, UserData } from '../../types/types';

export const defaultUser: UserData = {
  name: '',
  surname: '',
  lastPassedRound: {},
  passedLevels: [],
  passedRounds: [],
};

export const NAME_INPUT_MIN_LENGTH = 3;
export const SURNAME_INPUT_MIN_LENGTH = 4;

export const SEVER_STORAGE_KEY: string = 'rss-puzzle-server';
export const CLIENT_STORAGE_KEY: string = 'rss-puzzle-client';
export const AUTH_DATA_KEY: string = 'saved-user';
export const HINT_DATA_KEY: string = 'is-checked';

export const INVALID_CHARS: string = `Only english letters or "-" are allowable`;
export const INVALID_FIRST_LETTER: string = 'First letter must be in uppercase';

export const NUM_OF_SENTENCES_IN_ROUND = 10;

export const classes: Dictionary = {
  audioHintBtn: 'audio-hint-btn',
  btn: 'btn',
  checkBtn: 'btn-check',
  container: 'container',
  continueBtn: 'btn-continue',
  field: 'field',
  fieldImg: 'field-img',
  fieldInvalid: 'field_invalid',
  fieldValidation: 'field__validation',
  game: 'game',
  gameArea: 'game__area',
  gameAudioBtn: 'game__audio-btn',
  gameAudioBtnActive: 'game__audio-btn_active',
  gameButtons: 'game__buttons',
  gameControls: 'game__controls',
  gameField: 'game__field',
  gameFieldImgVisible: 'game__field_img-visible',
  gameHintControls: 'game__hint-controls',
  gameInner: 'game__inner',
  gameRowNumber: 'game__row-number',
  gameRowNumberActive: 'game__row-number_active',
  gameRowNumbers: 'game__row-numbers',
  gameSelector: 'game__selector',
  gameTable: 'game__table',
  gameTableBgVisible: 'game__table_bg-visible',
  gameTextHint: 'game__text-hint',
  gameTextHintActive: 'game__text-hint_active',
  gameWindow: 'game__window',
  gameWords: 'game__words',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  header: 'header',
  headerInner: 'header__inner',
  hidden: 'hidden',
  iconBtn: 'icon-btn',
  iconBtnChecked: 'icon-btn_checked',
  iconBtnSmall: 'icon-btn_small',
  imgHintBtn: 'img-hint-btn',
  input: 'input',
  inputControl: 'input__control',
  intro: 'intro',
  introFullscreen: 'intro_fullscreen',
  introColumn: 'intro__column',
  introGreeting: 'intro__greeting',
  introGreetingVisible: 'intro__greeting_visible',
  introGrid: 'intro__grid',
  introImg: 'intro__img',
  introInner: 'intro__inner',
  introStartBtn: 'intro__start-btn',
  introText: 'intro__text',
  introTitle: 'intro__title',
  levelSelector: 'level-selector',
  login: 'login',
  loginBlock: 'login-block',
  loginBlockForm: 'login-block__form',
  loginBlockLabel: 'login-block__label',
  loginBlockLoginBtn: 'login-block__login-btn',
  loginBlockNameField: 'login-block__name-field',
  loginBlockSurnameField: 'login-block__surname-field',
  loginBtn: 'login-btn',
  loginField: 'login-field',
  loginInner: 'login__inner',
  logo: 'logo',
  logoutBtn: 'logout-btn',
  page: 'page',
  pageGame: 'page_game',
  pageHeader: 'page__header',
  pageLogin: 'page_login',
  pageStart: 'page_start',
  pageStatisitcs: 'page_statistics',
  playbackStatusBtn: 'playback-status-btn',
  playbackStatusBtnActive: 'playback-status-btn_active',
  playAudioBtn: 'play-audio-btn',
  playAudioBtnActive: 'play-audio-btn_active',
  playAudioBtnInvisible: 'play-audio-btn_invisible',
  playAudioBtnSm: 'play-audio-btn_sm',
  primaryBtn: 'primary-btn',
  primaryBtnSmall: 'primary-btn_small',
  results: 'results',
  resultsBadge: 'results__badge',
  resultsBlock: 'results-block',
  resultsBlockButtons: 'results-block__buttons',
  resultsBlockTitle: 'results-block__title',
  resultsBtn: 'btn-results',
  resultsError: 'results_error',
  resultsItem: 'results__item',
  resultsItemText: 'results__item-text',
  resultsPlayBtn: 'results__play-btn',
  resultsSuccess: 'results_success',
  resultsTitle: 'results__title',
  resultsTitleText: 'results__title-text',
  roundSelector: 'round-selector',
  selector: 'selector',
  selectorBlock: 'selector-block',
  selectorBlockTitle: 'selector-block__title',
  selectorOption: 'selector__option',
  sentence: 'sentence',
  sentenceCorrect: 'sentence_correct',
  sentenceWrong: 'sentence_wrong',
  solveBtn: 'btn-solve',
  statistics: 'statistics',
  statisticsInner: 'statistics__inner',
  showImgBtn: 'show-img-btn',
  textHintBtn: 'text-hint-btn',
  thumbnail: 'thumbnail',
  thumbnailCaption: 'thumbnail__caption',
  thumbnailImg: 'thumbnail__img',
  window: 'window',
  windowSmall: 'window_small',
  windowTransparent: 'window_transparent',
  word: 'word',
};

export const classSelectors: Dictionary = Object.entries(classes).reduce<Dictionary>(
  (acc, [key, value]: [string, string]) => {
    acc[key] = `.${value}`;

    return acc;
  },
  {},
);

export const INTRO_TEXT: string = `RSS Puzzle is an interactive mini-game aimed at enhancing English language skills. Players assemble sentences from jumbled words, inspired by Lingualeo's Phrase Constructor training. The game integrates various levels of difficulty, hint options, and a unique puzzle-like experience with artwork.`;
