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

export type LoginLabel = ({ text, inputId }: LoginLabelParams) => HTMLElement;
export type LoginLabelParams = { text: string; inputId: string };

export type LoginField = ({ name }: LoginFieldParams) => HTMLElement;
export type LoginFieldParams = { name?: string };

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

export type IconBtn = ({ text, classNames, disabled, attr }: IconBtnParams) => HTMLElement;
export type IconBtnParams = Omit<CreateDomElementProps, 'tag'> & { disabled?: boolean };

export type PlayAudioBtn = ({ classNames, isSmall, src }: PlayAudioBtnParams) => HTMLElement;
export type PlayAudioBtnParams = Omit<CreateDomElementProps, 'tag'> & {
  isSmall?: boolean;
  src?: string;
};

export type Results = ({ type, list }: ResultsParams) => HTMLElement;
export type ResultsParams = { type: 'error' | 'success'; list: number[] };

export type ThumbnailFn = ({ caption, src }: { caption?: string; src?: string }) => HTMLElement;

export type LastRoundResults = { resolved: number[]; notResolved: number[] };
