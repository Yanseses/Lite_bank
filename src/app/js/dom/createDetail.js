import { creatorTags } from '../creatorTags.js';
import { createSelect } from './createSelect.js';
import { SUBHEADINGS, DETAIL_PAGE } from '../constants.js';

export function createTransSection(accountId) {
  const section = creatorTags('section', ['transaction']);
  const subheading = creatorTags(
    'h2',
    ['transaction__heading'],
    null,
    SUBHEADINGS.newTrans
  );
  const storeAccounts = JSON.parse(localStorage.getItem('accounts'));
  const accounts = new Array();
  if (storeAccounts !== null && storeAccounts.length > 0) {
    storeAccounts.forEach((el) => {
      if (el.id == accountId) {
        accounts.push(el.value);
      }
    });
  }
  const transForm = createTransForm(accounts);

  section.append(subheading, transForm);
  return { section, transForm };
}

function createTransForm(accounts) {
  const form = creatorTags('form', ['transaction__form']);
  const accountLabel = creatorTags('label', ['transaction__label'], {
    for: 'to',
  });
  const accountContainer = creatorTags('div', [
    'transaction__select-container',
  ]);
  const accountText = creatorTags(
    'p',
    ['transaction__label-text'],
    null,
    DETAIL_PAGE.transToText
  );
  const accountInput = creatorTags('input', ['transaction__input'], {
    name: 'to',
    type: 'number',
    placeholder: DETAIL_PAGE.transToPlace,
    autocomplete: 'off',
  });
  const accountBtn = creatorTags('button', ['transaction__select-btn']);
  const accountSelectContainer = creatorTags('div', ['transaction__select']);
  const accountSelect = accounts.length > 0 ? createSelect(accounts) : '';
  const accountError = creatorTags('div', ['transaction__error'], {
    id: 'error-to',
  });
  const summLabel = creatorTags('label', ['transaction__label'], {
    for: 'amount',
  });
  const summText = creatorTags(
    'p',
    ['transaction__label-text'],
    null,
    DETAIL_PAGE.transFromText
  );
  const summInput = creatorTags('input', ['transaction__input'], {
    name: 'amount',
    type: 'number',
    placeholder: DETAIL_PAGE.transFromPlace,
    autocomplete: 'off',
  });
  const summError = creatorTags('div', ['transaction__error'], {
    id: 'error-amount',
  });
  const submitInput = creatorTags(
    'button',
    ['transaction__submit'],
    { type: 'submit' },
    DETAIL_PAGE.transSubmit
  );

  if (accounts.length > 0) {
    accountSelectContainer.append(accountInput, accountBtn);
    accountContainer.append(accountSelectContainer, accountSelect);
    accountLabel.append(accountText, accountContainer, accountError);

    accountBtn.addEventListener('click', (e) => {
      e.preventDefault();

      accountSelect.classList.toggle('select-list--hide');
      accountBtn.classList.toggle('transaction__select-btn--rotate');
    });

    accountSelect.addEventListener('click', (e) => {
      accountInput.value = e.target.textContent;
      const items = accountSelect.querySelectorAll('.select-list__item');
      items.forEach((el) => {
        el.id == e.target.id
          ? el.classList.add('select-list__item--select')
          : el.classList.remove('select-list__item--select');
      });
      accountSelect.classList.add('select-list--hide');
      accountBtn.classList.remove('transaction__select-btn--rotate');
    });

    accountInput.onchange = () => {
      const items = accountSelect.querySelectorAll('.select-list__item');
      items.forEach((el) => el.classList.remove('select-list__item--select'));
    };
  } else {
    accountLabel.append(accountText, accountInput, accountError);
  }

  summLabel.append(summText, summInput, summError);
  form.append(accountLabel, summLabel, submitInput);
  return form;
}
