import { creatorTags } from '../creatorTags.js';
import { SUBHEADINGS, EXCHANGE_FORM, PAGE_ERRORS } from '../constants.js';
import { createSelect } from './createSelect.js';

export function createYourCur(data) {
  const container = creatorTags('section', ['your-cur']);
  const heading = creatorTags(
    'h2',
    ['your-cur__subheading'],
    null,
    SUBHEADINGS.your
  );
  let currenciesList;

  if (data.toString().substr(4, 5) !== 'Error') {
    currenciesList = creatorTags('ul', ['your-cur__list']);

    for (const key in data) {
      if (data[key].amount == '0') {
        continue;
      }
      const listItem = creatorTags('li', ['your-cur__item']);
      const code = creatorTags('p', ['your-cur__code'], null, data[key].code);
      const points = creatorTags('div', ['your-cur__points']);
      const amount = creatorTags(
        'p',
        ['your-cur__amount'],
        null,
        data[key].amount.toLocaleString()
      );

      listItem.append(code, points, amount);
      currenciesList.append(listItem);
    }
  } else {
    currenciesList = creatorTags('ul', ['your-cur__list', 'error']);
    const currenciesItem = creatorTags('li', ['error__item']);
    const currenciesText = creatorTags(
      'p',
      ['error__text'],
      null,
      PAGE_ERRORS.notConnect
    );

    currenciesItem.append(currenciesText);
    currenciesList.append(currenciesItem);
  }

  container.append(heading, currenciesList);
  return container;
}

export function createChangeCur() {
  const container = creatorTags('section', ['change']);
  const heading = creatorTags(
    'h2',
    ['change__subheading'],
    null,
    SUBHEADINGS.change
  );
  const changeList = creatorTags('ul', ['change__list']);

  container.append(heading, changeList);
  return { container, changeList };
}

export function createItemChange(data) {
  let listItem;

  if (data.type !== 'error') {
    listItem = creatorTags('li', ['change__item']);
    const code = creatorTags(
      'p',
      ['change__code'],
      null,
      `${data.from}/${data.to}`
    );
    const points = creatorTags(
      'div',
      data.change == 1
        ? ['change__points', 'change__points--green']
        : ['change__points', 'change__points--red']
    );
    const amount = creatorTags('p', ['change__amount'], null, data.rate);
    const arrow = creatorTags(
      'div',
      data.change == 1
        ? ['change__arrow', 'change__arrow--green']
        : ['change__arrow', 'change__arrow--red']
    );

    listItem.append(code, points, amount, arrow);
  } else {
    listItem = creatorTags('li', ['error__item']);
    const cardText = creatorTags(
      'p',
      ['error__text'],
      null,
      PAGE_ERRORS.notConnect
    );
    listItem.append(cardText);
  }

  return listItem;
}

export function createCurExchange(data) {
  const container = creatorTags('section', ['exchange']);
  const heading = creatorTags(
    'h2',
    ['exchange__subheading'],
    null,
    SUBHEADINGS.exchange
  );
  let form;

  if (data.toString().substr(4, 5) !== 'Error') {
    form = exchangeForm(data);
  } else {
    form = creatorTags('ul', ['error', 'error--cur']);
    const errorItem = creatorTags('li', ['error__item']);
    const errorText = creatorTags(
      'p',
      ['error__text'],
      null,
      PAGE_ERRORS.notConnect
    );

    errorItem.append(errorText);
    form.append(errorItem);
  }

  container.append(heading, form);
  return { container, form };
}

function exchangeForm(cur) {
  const form = creatorTags('form', ['exchange__form']);
  const containerLabels = creatorTags('div', ['exchange__container']);
  const containerSelects = creatorTags('div', ['exchange__select-container']);
  const fromLabel = creatorTags(
    'label',
    ['exchange__select-label'],
    { for: 'from' },
    EXCHANGE_FORM.labelFrom
  );
  const fromContainer = creatorTags('div', ['exchange__select']);
  const fromBtn = creatorTags(
    'button',
    ['exchange__button'],
    { name: 'from' },
    EXCHANGE_FORM.selectFrom
  );
  const fromSelect = createSelect(cur, EXCHANGE_FORM.selectFrom);
  const toLabel = creatorTags(
    'label',
    ['exchange__select-label'],
    { for: 'to' },
    EXCHANGE_FORM.labelTo
  );
  const toContainer = creatorTags('div', ['exchange__select']);
  const toBtn = creatorTags(
    'button',
    ['exchange__button'],
    { name: 'to' },
    EXCHANGE_FORM.selectTo
  );
  const toSelect = createSelect(cur, EXCHANGE_FORM.selectTo);
  const sumLabel = creatorTags(
    'label',
    ['exchange__input-label'],
    { for: 'amount' },
    EXCHANGE_FORM.labelInput
  );
  const sumInput = creatorTags('input', ['exchange__input'], {
    type: 'number',
    name: 'amount',
    placeholder: EXCHANGE_FORM.placeholdInput,
    autocomplete: 'off',
  });
  const sumErrorIcon = creatorTags('div', ['exchange__error']);
  const sumErrorValue = creatorTags('div', ['exchange__error-value']);
  const submit = creatorTags('input', ['exchange__submit'], {
    type: 'submit',
    value: EXCHANGE_FORM.submitBtn,
  });

  fromBtn.addEventListener('click', (e) => {
    e.preventDefault();

    fromSelect.classList.toggle('select-list--hide');
    fromBtn.classList.toggle('exchange__button--rotate');
  });

  toBtn.addEventListener('click', (e) => {
    e.preventDefault();

    toSelect.classList.toggle('select-list--hide');
    toBtn.classList.toggle('exchange__button--rotate');
  });

  fromSelect.addEventListener('click', (e) => {
    selectCur(fromBtn, fromSelect, e);
  });

  toSelect.addEventListener('click', (e) => {
    selectCur(toBtn, toSelect, e);
  });

  sumErrorIcon.append(sumErrorValue);
  fromContainer.append(fromBtn, fromSelect);
  toContainer.append(toBtn, toSelect);
  fromLabel.append(fromContainer);
  toLabel.append(toContainer);
  containerSelects.append(fromLabel, toLabel);
  sumLabel.append(sumInput, sumErrorIcon);
  containerLabels.append(containerSelects, sumLabel);
  form.append(containerLabels, submit);
  return form;
}

function selectCur(btn, list, element) {
  const items = list.querySelectorAll('.select-list__item');
  items.forEach((el) => {
    el.id == element.target.id
      ? el.classList.add('select-list__item--select')
      : el.classList.remove('select-list__item--select');
  });
  btn.textContent = element.target.id;
  list.classList.add('select-list--hide');
  btn.classList.remove('exchange__button--rotate');
}
