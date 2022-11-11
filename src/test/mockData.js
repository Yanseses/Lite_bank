export const AUTH = {
  data: {
    correct: {
      login: 'developer',
      password: 'skillbox',
    },
    shortLogin: {
      login: 'deve',
      password: 'skillbox',
    },
    shortPass: {
      login: 'develop',
      password: 'skil',
    },
    shortAll: {
      login: 'dev',
      password: 'skil',
    },
  },
  resultHTML:
    '<form class="auth-form"><label class="auth-form__label" for="login"><p class="auth-form__label-text">Логин</p><input class="auth-form__input" name="login" type="text" placeholder="Введите логин" autocomplete="off"><div class="auth-form__error" id="error-login"></div></label><label class="auth-form__label" for="password"><p class="auth-form__label-text">Пароль</p><input class="auth-form__input" name="password" type="password" placeholder="Введите пароль" autocomplete="off"><button class="auth-form__input-btn auth-form__input-btn--close" type="button"></button><div class="auth-form__error" id="error-password"></div></label><input class="auth-form__submit" type="submit" value="Войти"></form>',
};

export const CARDS = {
  responce: [
    {
      account: '78484802073310266381735226',
      balance: 4416,
      mine: true,
      transactions: [
        {
          amount: 1,
          date: '2022-03-28T08:59:07.985Z',
          from: '78484802073310266381735226',
          to: '60628534212700553228853457',
        },
      ],
    },
    {
      account: '00543042172348676447807185',
      balance: 0,
      mine: true,
      transactions: [],
    },
  ],
  resultHTML: {
    correct:
      '<ul class="card-list"><li class="card-list__item"><h3 class="card-list__head">78484802073310266381735226</h3><p class="card-list__balance">4&nbsp;416 ₽</p><div class="card-list__wrapper"><div class="card-list__wrapper-transact"><p class="card-list__wrapper-subhead">Последняя транзакция</p><p class="card-list__wrapper-date">28 Марта 2022</p></div><a class="card-list__wrapper-button" id="78484802073310266381735226">Открыть</a></div></li><li class="card-list__item"><h3 class="card-list__head">00543042172348676447807185</h3><p class="card-list__balance">0 ₽</p><div class="card-list__wrapper"><div class="card-list__wrapper-transact"><p class="card-list__wrapper-subhead">Последняя транзакция</p><p class="card-list__wrapper-date">-</p></div><a class="card-list__wrapper-button" id="00543042172348676447807185">Открыть</a></div></li></ul>',
    void: '<ul class="error error--list"><li class="error__item"><p class="error__text">Сервис временно недоступен. Попробуйте зайти позднее</p></li></ul>',
  },
};

export const FILTER = {
  button:
    '<button class="filter__btn" type="button" disabled="disabled">Сортировка</button>',
  container:
    '<div class="filter"><button class="filter__btn" type="button" disabled="disabled">Сортировка</button><ul class="select-list select-list--hide"><li class="select-list__item" id="number">По номеру</li><li class="select-list__item" id="balance">По балансу</li><li class="select-list__item" id="lastTransaction">По последней транзакции</li></ul></div>',
  list: '<ul class="select-list select-list--hide"><li class="select-list__item" id="number">По номеру</li><li class="select-list__item" id="balance">По балансу</li><li class="select-list__item" id="lastTransaction">По последней транзакции</li></ul>',
};

export const CURRENCIES = {
  validation: {
    inputData1: {
      amount: '-1',
    },
    inputData2: {
      amount: '0',
    },
    inputData3: {
      amount: '',
    },
    inputData4: {
      amount: '10',
    },
    outputData1: {
      amount: 'Значение не может быть нулевым или отрицательным',
      status: [false],
    },
    outputData2: {
      amount: 'Значение не может быть нулевым или отрицательным',
      status: [false],
    },
    outputData3: {
      amount: 'Поле не может быть пустым',
      status: [false],
    },
    outputData4: {
      status: [true],
    },
  },
  exchangeSection: {
    inputData: {
      AUD: 'AUD',
      BTC: 'BTC',
      BYR: 'BYR',
    },
    outputData: {
      container:
        '<section class="exchange"><h2 class="exchange__subheading">Обмен валют</h2><form class="exchange__form"><div class="exchange__container"><div class="exchange__select-container"><label class="exchange__select-label" for="from">Из<div class="exchange__select"><button class="exchange__button" name="from">BTC</button><ul class="select-list select-list--hide"><li class="select-list__item" id="AUD">AUD</li><li class="select-list__item select-list__item--select" id="BTC">BTC</li><li class="select-list__item" id="BYR">BYR</li></ul></div></label><label class="exchange__select-label" for="to">в<div class="exchange__select"><button class="exchange__button" name="to">ETH</button><ul class="select-list select-list--hide"><li class="select-list__item" id="AUD">AUD</li><li class="select-list__item" id="BTC">BTC</li><li class="select-list__item" id="BYR">BYR</li></ul></div></label></div><label class="exchange__input-label" for="amount">Сумма<input class="exchange__input" type="number" name="amount" placeholder="Введите сумму" autocomplete="off"><div class="exchange__error"><div class="exchange__error-value"></div></div></label></div><input class="exchange__submit" type="submit" value="Обменять"></form></section>',
      form: '<form class="exchange__form"><div class="exchange__container"><div class="exchange__select-container"><label class="exchange__select-label" for="from">Из<div class="exchange__select"><button class="exchange__button" name="from">BTC</button><ul class="select-list select-list--hide"><li class="select-list__item" id="AUD">AUD</li><li class="select-list__item select-list__item--select" id="BTC">BTC</li><li class="select-list__item" id="BYR">BYR</li></ul></div></label><label class="exchange__select-label" for="to">в<div class="exchange__select"><button class="exchange__button" name="to">ETH</button><ul class="select-list select-list--hide"><li class="select-list__item" id="AUD">AUD</li><li class="select-list__item" id="BTC">BTC</li><li class="select-list__item" id="BYR">BYR</li></ul></div></label></div><label class="exchange__input-label" for="amount">Сумма<input class="exchange__input" type="number" name="amount" placeholder="Введите сумму" autocomplete="off"><div class="exchange__error"><div class="exchange__error-value"></div></div></label></div><input class="exchange__submit" type="submit" value="Обменять"></form>',
    },
  },
  yourSection: {
    inputData: {
      AUD: {
        amount: 4.337414116177389,
        code: 'AUD',
      },
      BTC: {
        amount: 3117.50360729351,
        code: 'BTC',
      },
      BYR: {
        amount: 81.8609090909091,
        code: 'BYR',
      },
    },
    outputData:
      '<section class="your-cur"><h2 class="your-cur__subheading">Ваши валюты</h2><ul class="your-cur__list"><li class="your-cur__item"><p class="your-cur__code">AUD</p><div class="your-cur__points"></div><p class="your-cur__amount">4,337</p></li><li class="your-cur__item"><p class="your-cur__code">BTC</p><div class="your-cur__points"></div><p class="your-cur__amount">3&nbsp;117,504</p></li><li class="your-cur__item"><p class="your-cur__code">BYR</p><div class="your-cur__points"></div><p class="your-cur__amount">81,861</p></li></ul></section>',
  },
  changeSection: {
    outputData: {
      container:
        '<section class="change"><h2 class="change__subheading">Изменение курсов в реальном времени</h2><ul class="change__list"></ul></section>',
      list: '<ul class="change__list"></ul>',
    },
  },
};

export const DETAIL = {
  account: '78484802073310266381735226',
  transSection: {
    outputSection:
      '<section class="transaction"><h2 class="transaction__heading">Новый перевод</h2><form class="transaction__form"><label class="transaction__label" for="to"><p class="transaction__label-text">Номер счёта получателя</p><input class="transaction__input" name="to" type="number" placeholder="Выберите счет" autocomplete="off"><div class="transaction__error" id="error-to"></div></label><label class="transaction__label" for="amount"><p class="transaction__label-text">Сумма перевода</p><input class="transaction__input" name="amount" type="number" placeholder="Введите сумму" autocomplete="off"><div class="transaction__error" id="error-amount"></div></label><button class="transaction__submit" type="submit">Отправить</button></form></section>',
    outputForm:
      '<form class="transaction__form"><label class="transaction__label" for="to"><p class="transaction__label-text">Номер счёта получателя</p><input class="transaction__input" name="to" type="number" placeholder="Выберите счет" autocomplete="off"><div class="transaction__error" id="error-to"></div></label><label class="transaction__label" for="amount"><p class="transaction__label-text">Сумма перевода</p><input class="transaction__input" name="amount" type="number" placeholder="Введите сумму" autocomplete="off"><div class="transaction__error" id="error-amount"></div></label><button class="transaction__submit" type="submit">Отправить</button></form>',
  },
  parameters: {
    inputBalance: 4416,
    outputNoBalance:
      '<section class="parametrs"><p class="parametrs__account">№&nbsp;78484802073310266381735226</p><div class="parametrs__balance"><p class="parametrs__balance-title">Баланс</p><p class="parametrs__balance-value">Нет данных</p></div></section>',
    outputHaveBalance:
      '<section class="parametrs"><p class="parametrs__account">№&nbsp;78484802073310266381735226</p><div class="parametrs__balance"><p class="parametrs__balance-title">Баланс</p><p class="parametrs__balance-value">4&nbsp;416 ₽</p></div></section>',
  },
  historyTable: {
    tableOutputFull:
      '<section class="history-table history-table--lite"><h2 class="history-table__heading">История переводов</h2><ul class="history-table__list"><li class="history-table__item"><ul class="history-table__head"><li class="history-table__head-item">Счет отправителя</li><li class="history-table__head-item">Счет получателя</li><li class="history-table__head-item">Сумма</li><li class="history-table__head-item">Дата</li></ul></li><li class="history-table__item"><ul class="history-table__body"><li class="history-table__body-item">78484802073310266381735226</li><li class="history-table__body-item">60628534212700553228853457</li><li class="history-table__body-item history-table__body-item--down">- 1 ₽</li><li class="history-table__body-item">28.03.2022  11:59</li></ul><ul class="history-table__body"><li class="history-table__body-item">60628534212700553228853457</li><li class="history-table__body-item">78484802073310266381735226</li><li class="history-table__body-item history-table__body-item--up">+ 10 ₽</li><li class="history-table__body-item">25.03.2022  17:21</li></ul><ul class="history-table__body"><li class="history-table__body-item">78484802073310266381735226</li><li class="history-table__body-item">06682773140314643843644215</li><li class="history-table__body-item history-table__body-item--down">- 10 ₽</li><li class="history-table__body-item">24.03.2022  11:45</li></ul><ul class="history-table__body"><li class="history-table__body-item">78484802073310266381735226</li><li class="history-table__body-item">60628534212700553228853457</li><li class="history-table__body-item history-table__body-item--down">- 1 ₽</li><li class="history-table__body-item">24.03.2022  11:44</li></ul><ul class="history-table__body"><li class="history-table__body-item">78484802073310266381735226</li><li class="history-table__body-item">06682773140314643843644215</li><li class="history-table__body-item history-table__body-item--down">- 10 ₽</li><li class="history-table__body-item">24.03.2022  11:43</li></ul><ul class="history-table__body"><li class="history-table__body-item">78484802073310266381735226</li><li class="history-table__body-item">06682773140314643843644215</li><li class="history-table__body-item history-table__body-item--down">- 10 ₽</li><li class="history-table__body-item">24.03.2022  11:42</li></ul><ul class="history-table__body"><li class="history-table__body-item">78484802073310266381735226</li><li class="history-table__body-item">06682773140314643843644215</li><li class="history-table__body-item history-table__body-item--down">- 10 ₽</li><li class="history-table__body-item">24.03.2022  11:41</li></ul><ul class="history-table__body"><li class="history-table__body-item">78484802073310266381735226</li><li class="history-table__body-item">06682773140314643843644215</li><li class="history-table__body-item history-table__body-item--down">- 10 ₽</li><li class="history-table__body-item">24.03.2022  11:41</li></ul><ul class="history-table__body"><li class="history-table__body-item">78484802073310266381735226</li><li class="history-table__body-item">72514427053440134872837876</li><li class="history-table__body-item history-table__body-item--down">- 1 ₽</li><li class="history-table__body-item">23.03.2022  16:25</li></ul><ul class="history-table__body"><li class="history-table__body-item">78484802073310266381735226</li><li class="history-table__body-item">57168418475653243006074003</li><li class="history-table__body-item history-table__body-item--down">- 1 ₽</li><li class="history-table__body-item">23.03.2022  16:24</li></ul></li></ul></section>',
    tableOutputVoid:
      '<section class="history-table"><h2 class="history-table__heading">История переводов</h2><ul class="history-table__list"><li class="history-table__item"><ul class="history-table__head"><li class="history-table__head-item">Счет отправителя</li><li class="history-table__head-item">Счет получателя</li><li class="history-table__head-item">Сумма</li><li class="history-table__head-item">Дата</li></ul></li><li class="history-table__item"><div class="history-table__void"><p class="history-table__void-text">Переводы пока не совершались</p></div></li></ul></section>',
  },
  board: {
    boardOutputFull:
      '<section class="board board--lite"><h2 class="board__heading">Динамика баланса</h2><section class="board__container"><canvas class="board__canvas" width="54" height="19"></canvas></section></section>',
    boardOutputVoid:
      '<section class="board board--lite"><h2 class="board__heading">Динамика баланса</h2><section class="board__container"><div class="board__void"><p class="board__void-text">Переводы пока не совершались</p></div></section></section>',
  },
  validation: {
    errorData1: {
      to: '34567543213456765432456',
      amount: '10000',
      from: '78484802073310266381735226',
    },
    errorRes1: {
      amount: 'Значение не может быть нулевым или отрицательным',
      status: [true, false],
    },
    errorData2: {
      to: '34567543213456765432456',
      amount: '0',
    },
    errorRes2: {
      amount: 'Значение не может быть нулевым или отрицательным',
      status: [true, false],
    },
    errorData3: {
      to: '12345432345654312342',
      amount: '',
    },
    errorRes3: {
      amount: 'Поле не может быть пустым',
      status: [true, false],
    },
  },
};

export const HISTORY_TABLE = {
  full: [
    {
      date: '2022-03-05T14:10:34.169Z',
      from: '78484802073310266381735226',
      to: '60628534212700553228853457',
      amount: 11,
    },
    {
      date: '2022-03-05T14:11:05.805Z',
      from: '78484802073310266381735226',
      to: '60628534212700553228853457',
      amount: 1,
    },
    {
      date: '2022-03-05T14:12:21.674Z',
      from: '78484802073310266381735226',
      to: '60628534212700553228853457',
      amount: 1,
    },
    {
      date: '2022-03-05T14:12:30.828Z',
      from: '78484802073310266381735226',
      to: '60628534212700553228853457',
      amount: 11,
    },
    {
      date: '2022-03-10T08:55:37.527Z',
      from: '78484802073310266381735226',
      to: '60628534212700553228853457',
      amount: 1,
    },
    {
      date: '2022-03-10T08:57:31.077Z',
      from: '78484802073310266381735226',
      to: '60628534212700553228853457',
      amount: 1,
    },
    {
      date: '2022-03-10T08:58:09.026Z',
      from: '78484802073310266381735226',
      to: '60628534212700553228853457',
      amount: 1,
    },
    {
      date: '2022-03-10T14:53:10.129Z',
      from: '78484802073310266381735226',
      to: '60628534212700553228853457',
      amount: 1,
    },
    {
      date: '2022-03-10T14:53:23.899Z',
      from: '78484802073310266381735226',
      to: '33706325405320870871058804',
      amount: 1,
    },
    {
      date: '2022-03-10T14:53:42.320Z',
      from: '78484802073310266381735226',
      to: '47631825678866416355184676',
      amount: 1,
    },
    {
      date: '2022-03-10T14:56:57.781Z',
      from: '78484802073310266381735226',
      to: '47631825678866416355184676',
      amount: 1,
    },
    {
      date: '2022-03-10T14:57:26.400Z',
      from: '78484802073310266381735226',
      to: '33706325405320870871058804',
      amount: 11,
    },
    {
      date: '2022-03-11T10:03:31.913Z',
      from: '74213041477477406320783754',
      to: '78484802073310266381735226',
      amount: 11,
    },
    {
      date: '2022-03-18T13:34:11.564Z',
      from: '78484802073310266381735226',
      to: '60628534212700553228853457',
      amount: 11,
    },
    {
      date: '2022-03-23T13:24:30.007Z',
      from: '78484802073310266381735226',
      to: '57168418475653243006074003',
      amount: 1,
    },
    {
      date: '2022-03-23T13:25:07.621Z',
      from: '78484802073310266381735226',
      to: '72514427053440134872837876',
      amount: 1,
    },
    {
      date: '2022-03-24T08:41:09.046Z',
      from: '78484802073310266381735226',
      to: '06682773140314643843644215',
      amount: 10,
    },
    {
      date: '2022-03-24T08:41:34.305Z',
      from: '78484802073310266381735226',
      to: '06682773140314643843644215',
      amount: 10,
    },
    {
      date: '2022-03-24T08:42:46.574Z',
      from: '78484802073310266381735226',
      to: '06682773140314643843644215',
      amount: 10,
    },
    {
      date: '2022-03-24T08:43:19.128Z',
      from: '78484802073310266381735226',
      to: '06682773140314643843644215',
      amount: 10,
    },
    {
      date: '2022-03-24T08:44:49.726Z',
      from: '78484802073310266381735226',
      to: '60628534212700553228853457',
      amount: 1,
    },
    {
      date: '2022-03-24T08:45:42.139Z',
      from: '78484802073310266381735226',
      to: '06682773140314643843644215',
      amount: 10,
    },
    {
      date: '2022-03-25T14:21:53.756Z',
      from: '60628534212700553228853457',
      to: '78484802073310266381735226',
      amount: 10,
    },
    {
      date: '2022-03-28T08:59:07.985Z',
      from: '78484802073310266381735226',
      to: '60628534212700553228853457',
      amount: 1,
    },
  ],
  void: [],
};

export const HISTORY = {};
