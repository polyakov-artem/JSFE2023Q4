import { engineStates, order, sort } from '../common/js/constants';

export type Dictionary = {
  [key: string]: string;
};

export type Payload = {
  [key: string]: string | number;
};

export type QueryParts = {
  [key: string]: string | number;
};

export type FetchOptions = {
  method: HTTPMethod;
  headers: {
    'Content-Type': 'application/json';
  };
  body?: string;
};

export type FetchDataParams = {
  method: HTTPMethod;
  endpoint?: string;
  queryParts?: QueryParts;
  payload?: Payload;
  returnData?: boolean;
};

export type CreateDomElementParams = {
  tag?: keyof HTMLElementTagNameMap;
  classNames?: string[];
  text?: string;
  attr?: Dictionary;
};

export type CreateDomElement = ({
  tag,
  classNames,
  text,
  attr,
}: CreateDomElementParams) => HTMLElement;

export type CloneObj = (obj: object) => object;
export type GetRandom = (min: number, max: number) => number;
export type ShuffleArray = (array: unknown[]) => unknown[];

export type PrimaryBtn = ({
  text,
  classNames,
  isSmall,
  disabled,
  attr,
}: PrimaryBtnParams) => HTMLButtonElement;

export type PrimaryBtnParams = Omit<CreateDomElementParams, 'tag'> & {
  isSmall?: boolean;
  disabled?: boolean;
};

export type IsEmptyObj = (obj: object) => boolean;

export type IsObj = (obj: unknown) => boolean;

export type HTTPMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

export type DisableElement = (element: HTMLElement) => void;
export type EnableElement = (element: HTMLElement) => void;

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type Car = {
  id: number;
  color: string;
  name: string;
};

export type WinnerUpdateData = {
  wins: number;
  time: number;
};

export type CarUpdateData = {
  name: string;
  color: string;
};

export type EngineData = {
  velocity: number;
  distance: number;
};

export type SortByType = (typeof sort)[keyof typeof sort];
export type OrderByType = (typeof order)[keyof typeof order];
export type EngineStates = (typeof engineStates)[keyof typeof engineStates];

export type FetchReturnData<T> = { data: T | undefined; response: Response | undefined };

export type RaceWinner = { id: number; time: number };
export type RaceWinnerEventData = { name: string; time: number };

export type PromiseAsyncFn = (resolve: PromiseCbFn, reject: PromiseCbFn) => Promise<void>;
export type PromiseCbFn = (value: unknown) => void;

export type TabsConstructorParams = {
  activeTabIndex?: number;
  tabsNames: string[];
  buttonsText: string[];
  tabsContent: HTMLElement[];
};

export type SvgElement = (props: { classNames: string[]; id: string }) => SVGSVGElement;

export type CarInfo = {
  id: string;
  car: HTMLElement;
  btnSelectCar: HTMLButtonElement;
  btnDeleteCar: HTMLButtonElement;
  btnStartCar: HTMLButtonElement;
  btnReturnCar: HTMLButtonElement;
  carIcon: HTMLElement;
  iconCar: SVGSVGElement;
};
