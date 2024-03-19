export type Dictionary = {
  [key: string]: string;
};

export type UserData = {
  name: string;
  surname: string;
  lastPassedRound: LastPassedRound;
  passedLevels: number[];
  passedRounds: number[][];
};

export type LastPassedRound = { lastLevel?: number; lastRound?: number };

export type LevelsData = LevelData[];

export type LevelData = {
  rounds: RoundData[];
  roundsCount: number;
};

export type RoundData = {
  roundResult: RoundResult;
  sentences: SentenceData[];
};

export type SentenceData = {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
};

export type RoundResult = {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
};

export type ShuffleArray = <T>(array: T[]) => T[];

export type CreateDomElement = ({
  tag,
  classNames,
  text,
  attr,
}: CreateDomElementProps) => HTMLElement;

export type GetRandom = (min: number, max: number) => number;

export type CloneObj = <T>(obj: T) => T;
export type GetGridStyles = (words: string[]) => string;

export type CreateDomElementProps = {
  tag?: keyof HTMLElementTagNameMap;
  classNames?: string[];
  text?: string;
  attr?: Dictionary;
};
export type PrimaryBtn = ({
  text,
  classNames,
  isSmall,
  disabled,
  attr,
}: PrimaryBtnProps) => HTMLElement;

export type PrimaryBtnProps = Omit<CreateDomElementProps, 'tag'> & {
  isSmall?: boolean;
  disabled?: boolean;
};

export type LoginLabel = ({ text, inputId }: { text: string; inputId: string }) => HTMLElement;
export type LoginField = ({ name }: { name?: string }) => HTMLElement;

export type AuthData = { name: string; surname: string };

export type PlayFnProps = {
  src?: string;
  startPlayingCb: () => void;
  endPlayingCb: () => void;
  errorCb: () => void;
};

export type AddListenersForAudio = (
  startPlayingCb: () => void,
  endPlayingCb: () => void,
  errorCb: () => void,
) => void;

export type IconBtnFn = ({
  text,
  classNames,
  disabled,
  attr,
}: {
  text?: string;
  classNames?: string[];
  disabled?: boolean;
  attr?: Dictionary;
}) => HTMLElement;

export type PlayAudioBtnFn = ({
  classNames,
  isSmall,
  attr,
  src,
}: {
  classNames?: string[];
  isSmall?: boolean;
  attr?: Dictionary;
  src?: string;
}) => HTMLElement;

export type ResultsFn = ({
  type,
  list,
}: {
  type: 'error' | 'success';
  list: number[];
}) => HTMLElement;

export type ThumbnailFn = ({ caption, src }: { caption?: string; src?: string }) => HTMLElement;
