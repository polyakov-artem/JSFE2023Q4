import { Dictionary } from '../../types/types';

export const classes: Dictionary = {
  btn: 'btn',
  btnAddCar: 'btn-add-car',
  btnUpdateCar: 'btn-update-car',
  btnDeleteCar: 'btn-delete-car',
  btnGenerateCars: 'btn-generate-cars',
  btnPrimary: 'btn-primary',
  btnPrimarySmall: 'btn-primary_small',
  btnResetRaces: 'btn-reset-races',
  btnReturnCar: 'btn-return-car',
  btnSelectCar: 'btn-select-car',
  btnStartCar: 'btn-start-car',
  btnStartRaces: 'btn-start-races',
  car: 'car',
  carSelected: 'car_selected',
  carOnRace: 'car_on-race',
  carStopped: 'car_stopped',
  carControls: 'car__controls',
  carDistance: 'car__distance',
  iconCar: 'icon-car',
  carIcon: 'car__icon',
  carInner: 'car__inner',
  carManage: 'car__manage',
  carName: 'car__name',
  cars: 'cars',
  carTrack: 'car__track',
  colorSelector: 'color-selector',
  container: 'container',
  game: 'game',
  gameInner: 'game__inner',
  garage: 'garage',
  garageInner: 'garage__inner',
  addCarField: 'add-car-field',
  updateCarField: 'update-car-field',
  garageControls: 'garage__controls',
  garageMainControls: 'garage__main-controls',
  garageTitle: 'garage__title',
  garageCars: 'garage__cars',
  garagePageNumber: 'garage__page-number',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  input: 'input',
  optionsSelector: 'options-selector',
  page: 'page',
  results: 'results',
  resultsCell: 'results__cell',
  resultsHeader: 'results__header',
  resultsImgCell: 'results__img-cell',
  tabBtn: 'tab-btn',
  tabBtnActive: 'tab-btn_active',
  tabs: 'tabs',
  tabsContent: 'tabs__content',
  tabsControls: 'tabs__controls',
  tabsTab: 'tabs__tab',
  tabsTabActive: 'tabs__tab_active',
  modalWindow: 'modal-window',
  modalWindowActive: 'modal-window_active',
  modalWindowText: 'modal-window__text',
  winners: 'winners',
  winnersInner: 'winners__inner',
  winnersCarIcon: 'winners__car-icon',
  winnersTitle: 'winners__title',
  winnersPageNumber: 'winners__page-number',
  winnersTable: 'winners__table',
  winnersTableHeader: 'winners__table-header',
  winnersCell: 'winners__cell',
  winnersTableBody: 'winners__table-body',
  winnersSortBtn: 'winners__sort-btn',
  btnSortBy: 'btn-sort-by',
  pagination: 'pagination',
  paginationNextBtn: 'pagination__next-btn',
  paginationPrevBtn: 'pagination__prev-btn',
};

export const classSelectors: Dictionary = Object.entries(classes).reduce<Dictionary>(
  (acc, [key, value]: [string, string]) => {
    acc[key] = `.${value}`;
    return acc;
  },
  {},
);

export const attributeKeys: Dictionary = {
  tabBtn: 'data-target-tab',
  tab: 'data-tab',
  carId: 'data-car-id',
  carColor: 'data-car-color',
  carName: 'data-car-name',
  sortBy: 'data-sortby',
  orderBy: 'data-orderby',
};

export enum HTTPMethods {
  get = 'GET',
  head = 'HEAD',
  post = 'POST',
  put = 'PUT',
  patch = 'PATCH',
  delete = 'DELETE',
  connect = 'CONNECT',
  options = 'OPTIONS',
  trace = 'TRACE',
}

export enum HTTPStatusCodes {
  ok = 200,
  created = 201,
  badRequest = 400,
  notFound = 404,
  tooManyRequests = 429,
  internalServerError = 500,
}

export const endpoints = {
  garage: '/garage',
  engine: '/engine',
  winners: '/winners',
} as const;

export const engineStates = {
  started: 'started',
  stopped: 'stopped',
  driveMode: 'drive',
} as const;

export const CARS_PAGE_LIMIT: number = 7;
export const WINNERS_PAGE_LIMIT: number = 10;
export const TOTAL_COUNT_HEADER_KEY: string = 'X-Total-Count';
export const DISTANCE: number = 500000;

export const customEvents: Dictionary = {
  winnersUpdate: 'winnersUpdate',
  currentCarsUpdate: 'currentCarsUpdate',
  newWinner: 'newWinner',
  raceStopped: 'raceStopped',
  carStarted: 'carStarted',
  carMoving: 'carMoving',
  carStopped: 'carStopped',
  carReturn: 'carReturn',
};

export const svgIds: Dictionary = {
  car: 'car',
};

export const sort = {
  wins: 'wins',
  time: 'time',
  id: 'id',
} as const;

export const order = {
  asc: 'ASC',
  desc: 'DESC',
} as const;

export const sortBtnText = {
  asc: '↓',
  desc: '↑',
} as const;

export const carPostfixes: string[] = [
  'Essence',
  'Quicksilver',
  'Freedom',
  'Aurora',
  'Harmony',
  'Magic',
  'Legend',
  'Patron',
  'Excursion',
  'Sliver',
  'Might',
  'Blend',
  'Eminence',
  'Zeal',
  'Encounter',
  'Empyrean',
  'Reach',
  'Purity',
  'Hero',
  'Legacy',
  'Ivory',
  'Orbit',
  'Guardian',
  'Paragon',
  'Desire',
  'Origin',
  'Pyre',
  'Capital',
  'Supremacy',
  'Tempest',
  'Silver',
  'Warrior',
  'Ranger',
  'Storm',
  'Centurion',
  'Oracle',
  'Dusk',
  'Universe',
  'Motion',
];

export const carManufacturers: string[] = [
  'Abarth',
  'Alfa Romeo',
  'Aston Martin',
  'Audi',
  'Bentley',
  'BMW',
  'Bugatti',
  'Cadillac',
  'Chevrolet',
  'Chrysler',
  'Citroën',
  'Dacia',
  'Daewoo',
  'Daihatsu',
  'Dodge',
  'Donkervoort',
  'DS',
  'Ferrari',
  'Fiat',
  'Fisker',
  'Ford',
  'Honda',
  'Hummer',
  'Hyundai',
  'Infiniti',
  'Iveco',
  'Jaguar',
  'Jeep',
  'Kia',
  'KTM',
  'Lada',
  'Lamborghini',
  'Lancia',
  'Land Rover',
  'Landwind',
  'Lexus',
  'Lotus',
  'Maserati',
  'Maybach',
  'Mazda',
  'McLaren',
  'Mercedes-Benz',
  'MG',
  'Mini',
  'Mitsubishi',
  'Morgan',
  'Nissan',
  'Opel',
  'Peugeot',
  'Porsche',
  'Renault',
  'Rolls-Royce',
  'Rover',
  'Saab',
  'Seat',
  'Skoda',
  'Smart',
  'SsangYong',
  'Subaru',
  'Suzuki',
  'Tesla',
  'Toyota',
  'Volkswagen',
  'Volvo',
];
