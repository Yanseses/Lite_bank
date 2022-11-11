export const URL = 'http://localhost:3000';

export const NAVINGATION = {
  banks: {
    name: 'Банкоматы',
    id: 'banks',
  },
  card: {
    name: 'Счета',
    id: 'card',
  },
  currencies: {
    name: 'Валюты',
    id: 'currencies',
  },
  quit: {
    name: 'Выйти',
    id: 'auth',
  },
};

export const PAGES = {
  card: 'card',
  auth: 'auth',
  currencies: 'currencies',
  detail: 'detail',
  history: 'history',
  banks: 'banks',
};

export const HEADINGS = {
  auth: 'Вход в аккаунт',
  card: 'Ваши счета',
  detail: 'Просмотр счёта',
  history: 'История баланса',
  currencies: 'Валютный обмен',
  banks: 'Карта банкоматов',
};

export const SUBHEADINGS = {
  your: 'Ваши валюты',
  change: 'Изменение курсов в реальном времени',
  exchange: 'Обмен валют',
  newTrans: 'Новый перевод',
  lite: 'Динамика баланса',
  balance: 'Динамика баланса',
  ratio: 'Соотношение входящих исходящих транзакций',
  history: 'История переводов',
};

export const BUTTONS = {
  auth: 'Войти',
  card: 'Открыть',
  newCard: 'Создать новый счёт',
  back: 'Вернуться назад',
};

export const AUTH_PAGE = {
  labelLog: 'Логин',
  labelPas: 'Пароль',
  placeLog: 'Введите логин',
  placePas: 'Введите пароль',
};

export const CARD_PAGE = {
  lastTransaction: 'Последняя транзакция',
  openBtn: 'Открыть',
  newAccount: 'Создать новый счет',
};

export const DETAIL_PAGE = {
  backBtn: 'Вернуться назад',
  balance: 'Баланс',
  transToText: 'Номер счёта получателя',
  transFromText: 'Сумма перевода',
  transToPlace: 'Выберите счет',
  transFromPlace: 'Введите сумму',
  transSubmit: 'Отправить',
};

export const PAGE_ERRORS = {
  notConnect: 'Сервис временно недоступен. Попробуйте зайти позднее',
};

export const INPUT_ERRORS = {
  authSmartStr: 'Длинна менее 6 символов',
  transSmartStr: 'Длинна менее 20 символов',
  transMinimal: 'Значение не может быть нулевым или отрицательным',
  curSmartStr: 'Поле не может быть пустым',
};

export const POPUP_ERRORS = {
  headPopUp: 'Ошибка',
  btnPopUp: 'Хорошо',
  unknownCode: 'Неизвестный код валюты. Попробуйте еще раз.',
  invalidAmount: 'Недопустимая сумма. Попробуйте еще раз.',
  enoughCurrency: 'Недостаточно валюты для перевода.',
  overdraftPrevented:
    'На текущем валютном счете недостаточно средств для конвертации. Попробуйте изменить сумму.',
  invalidTo: 'Не верно указан аккаунт получателя. Скорректируйте значение.',
  invalidFrom: 'Ваш счет временно заблокирован. Обратитесь в службу поддержки.',
  noSuchUser:
    'Учетная запись не найдена. Проверьте корректнось заполнения полей.',
  invalidPass:
    'Не корректный пароль. Проверьте правильность заполнения и попробуйте еще раз.',
  default: 'Ошибка ответа сервера. Попробуйте снова.',
};

export const FILTERS = {
  number: 'По номеру',
  balance: 'По балансу',
  lastTransaction: 'По последней транзакции',
};

export const EXCHANGE_FORM = {
  labelFrom: 'Из',
  labelTo: 'в',
  labelInput: 'Сумма',
  selectFrom: 'BTC',
  selectTo: 'ETH',
  placeholdInput: 'Введите сумму',
  submitBtn: 'Обменять',
};

export const MOUTH = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
];

export const CURRENCIES_ICONS = {
  ru: '&#8381;',
};

export const HISTORY_TABLE = {
  acountFrom: 'Счет отправителя',
  acountTo: 'Счет получателя',
  summ: 'Сумма',
  date: 'Дата',
};
