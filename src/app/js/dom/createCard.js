import { creatorTags } from '../creatorTags.js';
import { createSelect } from './createSelect.js';
import {
  CARD_PAGE,
  FILTERS,
  MOUTH,
  CURRENCIES_ICONS,
  PAGE_ERRORS,
} from '../constants.js';

export function createCards(data) {
  let cardList;

  if (data.length > 0) {
    cardList = creatorTags('ul', ['card-list']);

    data.forEach((el) => {
      const date =
        el.transactions.length > 0 ? new Date(el.transactions[0].date) : '-';
      const cardItem = creatorTags('li', ['card-list__item']);
      const cardHead = creatorTags('h3', ['card-list__head'], null, el.account);
      const cardBalance = creatorTags(
        'p',
        ['card-list__balance'],
        null,
        Math.floor(el.balance).toLocaleString() + ` ${CURRENCIES_ICONS.ru}`
      );
      const wrapper = creatorTags('div', ['card-list__wrapper']);
      const transaction = creatorTags('div', ['card-list__wrapper-transact']);
      const subhead = creatorTags(
        'p',
        ['card-list__wrapper-subhead'],
        null,
        CARD_PAGE.lastTransaction
      );
      const transactionDate = creatorTags(
        'p',
        ['card-list__wrapper-date'],
        null,
        date != '-'
          ? `${date.getDate()} ${MOUTH[date.getMonth()]} ${date.getFullYear()}`
          : '-'
      );
      const button = creatorTags(
        'a',
        ['card-list__wrapper-button'],
        { id: el.account },
        CARD_PAGE.openBtn
      );

      transaction.append(subhead, transactionDate);
      wrapper.append(transaction, button);
      cardItem.append(cardHead, cardBalance, wrapper);
      cardList.append(cardItem);
    });
  } else {
    cardList = creatorTags('ul', ['error', 'error--list']);
    const cardItem = creatorTags('li', ['error__item']);
    const cardText = creatorTags(
      'p',
      ['error__text'],
      null,
      PAGE_ERRORS.notConnect
    );

    cardItem.append(cardText);
    cardList.append(cardItem);
  }

  return cardList;
}

export function createFilter() {
  const filterContainer = creatorTags('div', ['filter']);
  const filterBtn = creatorTags(
    'button',
    ['filter__btn'],
    { type: 'button', disabled: 'disabled' },
    'Сортировка'
  );
  const filterList = createSelect(FILTERS);

  filterContainer.append(filterBtn, filterList);

  return { filterContainer, filterBtn, filterList };
}
