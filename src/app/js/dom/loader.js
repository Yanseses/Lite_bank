import { creatorTags } from '../creatorTags.js';
import { HISTORY_TABLE } from '../constants.js';

export function loader(elem) {
  switch (elem.type) {
    case 'skeleton': {
      switch (elem.page) {
        case 'card': {
          const container = creatorTags('ul', ['card-list']);

          for (let i = 0; i < 9; i++) {
            const cardItem = creatorTags('li', ['card-list__item']);
            const cardHead = creatorTags('h3', [
              'card-list__head',
              'card-list__head--sceleton',
            ]);
            const cardBalance = creatorTags('p', [
              'card-list__balance',
              'card-list__balance--sceleton',
            ]);
            const wrapper = creatorTags('div', ['card-list__wrapper']);
            const transaction = creatorTags('div', [
              'card-list__wrapper-transact',
            ]);
            const subhead = creatorTags('p', [
              'card-list__wrapper-subhead',
              'card-list__wrapper-subhead--skeleton',
            ]);
            const transactionDate = creatorTags('p', [
              'card-list__wrapper-date',
              'card-list__wrapper-date--skeleton',
            ]);
            const button = creatorTags('a', [
              'card-list__wrapper-button',
              'card-list__wrapper-button--skeleton',
            ]);

            transaction.append(subhead, transactionDate);
            wrapper.append(transaction, button);
            cardItem.append(cardHead, cardBalance, wrapper);
            container.append(cardItem);
          }
          return container;
        }
        case 'currencies': {
          const container = creatorTags('section', ['currencies__wrapper']);
          const your = creatorTags('section', ['your-cur']);
          const yourHeading = creatorTags('h2', [
            'your-cur__subheading',
            'your-cur__subheading--skeleton',
          ]);
          const yourList = creatorTags('ul', ['your-cur__list']);
          for (let i = 0; i < 6; i++) {
            const yourItem = creatorTags('li', ['your-cur__item']);
            const yourCode = creatorTags('p', [
              'your-cur__code',
              'your-cur__code--skeleton',
            ]);
            const yourPoints = creatorTags('div', [
              'your-cur__points',
              'your-cur__points--skeleton',
            ]);
            const yourAmount = creatorTags('p', [
              'your-cur__amount',
              'your-cur__amount--skeleton',
            ]);
            yourItem.append(yourCode, yourPoints, yourAmount);
            yourList.append(yourItem);
          }
          const change = creatorTags('section', ['change']);
          const changeHeading = creatorTags('h2', [
            'change__subheading',
            'change__subheading--skeleton',
          ]);
          const changeList = creatorTags('ul', ['change__list']);
          for (let i = 0; i < 13; i++) {
            const changeItem = creatorTags('li', ['change__item']);
            const changeCode = creatorTags('p', [
              'change__code',
              'change__code--skeleton',
            ]);
            const changePoints = creatorTags('div', [
              'change__points',
              'change__points--skeleton',
            ]);
            const changeAmount = creatorTags('p', [
              'change__amount',
              'change__amount--skeleton',
            ]);

            changeItem.append(changeCode, changePoints, changeAmount);
            changeList.append(changeItem);
          }
          const exchange = creatorTags('section', ['exchange']);
          const exchangeHeading = creatorTags('h2', [
            'exchange__subheading',
            'exchange__subheading--skeleton',
          ]);

          your.append(yourHeading, yourList);
          change.append(changeHeading, changeList);
          exchange.append(exchangeHeading);
          container.append(your, change, exchange);
          return container;
        }
        case 'banks': {
          const container = creatorTags('div', [
            'banks__container',
            'banks__container--skeleton',
          ]);
          return container;
        }
        case 'detail': {
          const detailMain = creatorTags('section', ['detail__main']);

          const transact = creatorTags('section', ['transaction']);
          const transactSubheading = creatorTags('h2', [
            'transaction__heading',
            'transaction__heading--skeleton',
          ]);
          transact.append(transactSubheading);
          detailMain.append(transact);

          const board = creatorTags('section', ['board', 'board--lite']);
          const boardSubheading = creatorTags('h2', [
            'board__heading',
            'board__heading--skeleton',
          ]);
          board.append(boardSubheading);
          detailMain.append(board);

          const historyTable = historyTableLoader();
          detailMain.append(historyTable);

          return detailMain;
        }
        case 'history': {
          const pageLocation = location.pathname;
          const accountId = pageLocation.substring(6);
          const historyMain = creatorTags('section', ['history__main']);

          const historyParams = paramsPage(accountId);

          const historyTable = historyTableLoader();
          historyMain.append(historyTable);

          return historyMain;
        }
      }
      break;
    }
    case 'spinner': {
      const container = creatorTags('div', ['loader']);
      const spinner = creatorTags('div', ['loader__spinner']);

      container.append(spinner);
      return { container, spinner };
    }
  }
}

function historyTableLoader() {
  const hisTab = creatorTags('section', ['history-table']);
  const hisTabSubheading = creatorTags('h2', ['history-table__heading']);
  const hisTable = creatorTags('ul', ['history-table__list']);
  const hisHead = creatorTags('li', ['history-table__item']);
  const hisHeadRow = creatorTags('ul', ['history-table__head']);
  const hisBody = creatorTags('li', ['history-table__item']);
  for (const key in HISTORY_TABLE) {
    const hisHeadData = creatorTags(
      'li',
      ['history-table__head-item'],
      null,
      HISTORY_TABLE[key]
    );
    hisHeadRow.append(hisHeadData);
  }
  for (let i = 0; i < 3; i++) {
    const hisBodyRow = creatorTags('ul', [
      'history-table__body',
      'history-table__body--skeleton',
    ]);
    const hisBodyFrom = creatorTags('li', [
      'history-table__body-item',
      'history-table__body-item--skeleton',
    ]);
    const hisBodyTo = creatorTags('li', [
      'history-table__body-item',
      'history-table__body-item--skeleton',
    ]);
    const hisBodySumm = creatorTags('li', [
      'history-table__body-item',
      'history-table__body-item--skeleton',
    ]);
    const hisBodyDate = creatorTags('li', [
      'history-table__body-item',
      'history-table__body-item--skeleton',
    ]);

    hisBodyRow.append(hisBodyFrom, hisBodyTo, hisBodySumm, hisBodyDate);
    hisBody.append(hisBodyRow);
  }
  hisHead.append(hisHeadRow);
  hisTable.append(hisHead, hisBody);
  hisTab.append(hisTabSubheading, hisTable);
  return hisTab;
}

function paramsPage(account) {
  const parameters = creatorTags('section', ['parametrs']);
  const accountNumber = creatorTags(
    'p',
    ['parametrs__account'],
    null,
    `№ ${account}`
  );
  const balanceWrapper = creatorTags('div', ['parametrs__balance']);
  const balanceTitle = creatorTags(
    'p',
    ['parametrs__balance-title'],
    null,
    'Баланс'
  );
  const balanceValue = creatorTags('p', [
    'parametrs__balance-value',
    'parametrs__balance-value--skeleton',
  ]);
  balanceWrapper.append(balanceTitle, balanceValue);
  parameters.append(accountNumber, balanceWrapper);

  return parameters;
}
