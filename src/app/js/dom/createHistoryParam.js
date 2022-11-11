import { creatorTags } from '../creatorTags.js';
import {
  DETAIL_PAGE,
  CURRENCIES_ICONS,
  HISTORY_TABLE,
  SUBHEADINGS,
  MOUTH,
} from '../constants.js';
import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js';

export function createBackBtn(page) {
  return creatorTags(
    'button',
    [`${page}__back-btn`],
    { type: 'button', disabled: 'disabled' },
    DETAIL_PAGE.backBtn
  );
}

export function createParameters(account, balance = '') {
  const container = creatorTags('section', ['parametrs']);
  const accountNumber = creatorTags(
    'p',
    ['parametrs__account'],
    null,
    `№&nbsp;${account}`
  );
  const balanceWrapper = creatorTags('div', ['parametrs__balance']);
  const balanceTitle = creatorTags(
    'p',
    ['parametrs__balance-title'],
    null,
    DETAIL_PAGE.balance
  );
  const balanceValue = creatorTags(
    'p',
    ['parametrs__balance-value'],
    null,
    balance !== ''
      ? `${Math.floor(balance).toLocaleString()} ${CURRENCIES_ICONS.ru}`
      : 'Нет данных'
  );

  balanceWrapper.append(balanceTitle, balanceValue);
  container.append(accountNumber, balanceWrapper);
  return container;
}

export function createHistoryTable(account, transactions, maxLenght = 10) {
  const section = creatorTags('section', ['history-table']);
  const heading = creatorTags(
    'h2',
    ['history-table__heading'],
    null,
    SUBHEADINGS.history
  );
  const table = creatorTags('ul', ['history-table__list']);
  const head = creatorTags('li', ['history-table__item']);
  const headRow = creatorTags('ul', ['history-table__head']);
  const body = creatorTags('li', ['history-table__item']);

  for (const key in HISTORY_TABLE) {
    const headData = creatorTags(
      'li',
      ['history-table__head-item'],
      null,
      HISTORY_TABLE[key]
    );
    headRow.append(headData);
  }

  head.append(headRow);
  table.append(head, body);

  if (transactions.length > 0) {
    if (maxLenght == 10) section.classList.add('history-table--lite');

    for (let i = transactions.length - 1; i >= 0; --i) {
      if (maxLenght > 0) {
        const date = new Date(transactions[i].date);
        const bodyRow = creatorTags('ul', ['history-table__body']);
        const bodyFrom = creatorTags(
          'li',
          ['history-table__body-item'],
          null,
          transactions[i].from
        );
        const bodyTo = creatorTags(
          'li',
          ['history-table__body-item'],
          null,
          transactions[i].to
        );
        const bodySumm =
          transactions[i].from == account
            ? creatorTags(
                'li',
                ['history-table__body-item', 'history-table__body-item--down'],
                null,
                `- ${Math.floor(transactions[i].amount).toLocaleString()} ${
                  CURRENCIES_ICONS.ru
                }`
              )
            : creatorTags(
                'li',
                ['history-table__body-item', 'history-table__body-item--up'],
                null,
                `+ ${Math.floor(transactions[i].amount).toLocaleString()} ${
                  CURRENCIES_ICONS.ru
                }`
              );
        const bodyDate = creatorTags(
          'li',
          ['history-table__body-item'],
          null,
          `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${
            date.getMonth() + 1 < 10
              ? '0' + (date.getMonth() + 1)
              : date.getMonth() + 1
          }.${date.getFullYear()}  ${date.getHours()}:${
            date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
          }`
        );

        bodyRow.append(bodyFrom, bodyTo, bodySumm, bodyDate);
        body.append(bodyRow);
        maxLenght--;
      } else {
        break;
      }
    }
  } else {
    const voidContainer = creatorTags('div', ['history-table__void']);
    const voidText = creatorTags(
      'p',
      ['history-table__void-text'],
      null,
      'Переводы пока не совершались'
    );

    voidContainer.append(voidText);
    body.append(voidContainer);
  }

  section.append(heading, table);
  return section;
}

export function createBalanceBoard(transactions, type = 'lite', account = '') {
  const section = creatorTags('section', ['board', `board--${type}`]);
  const heading = creatorTags(
    'h2',
    ['board__heading'],
    null,
    SUBHEADINGS[type]
  );
  const container = creatorTags('section', ['board__container']);

  if (transactions.length > 0) {
    const canvas = creatorTags(
      'canvas',
      ['board__canvas'],
      type == 'lite'
        ? { width: '54', height: '19' }
        : { width: '114', height: '19' }
    );
    const ctx = canvas.getContext('2d');
    container.append(canvas);
    let options = new Object();
    let datasets = new Array();
    let monthArr = new Array();
    let data = new Object();

    class Dataset {
      constructor(bg, label = 'Транзакции') {
        this.backgroundColor = bg;
        this.label = label;
      }
    }

    if (type == 'ratio') {
      let spend = new Dataset('#FD4E5D', 'Траты');
      let replen = new Dataset('#76CA66', 'Пополнения');
      let arrSpend = new Array();
      let arrReplen = new Array();
      options = {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      };

      transactions.forEach((el) => {
        let payments;
        let mounth = new Date(el.date).getMonth();
        if (
          !Object.keys(data).includes(
            MOUTH[mounth].substring(0, 3).toUpperCase()
          )
        ) {
          payments = new Object();
          account == el.from
            ? (payments.replen = el.amount)
            : (payments.spend = el.amount);
          data[MOUTH[mounth].substring(0, 3).toUpperCase()] = payments;
        } else {
          payments = data[MOUTH[mounth].substring(0, 3).toUpperCase()];
          account == el.from
            ? payments.replen
              ? (payments.replen += el.amount)
              : (payments.replen = el.amount)
            : payments.spend
            ? (payments.spend += el.amount)
            : (payments.spend = el.amount);
          data[MOUTH[mounth].substring(0, 3).toUpperCase()] = payments;
        }
      });

      for (let i = 0; i < Object.entries(data).length; i++) {
        monthArr.push(Object.entries(data)[i][0]);
        arrReplen.push(Object.entries(data)[i][1].spend);
        arrSpend.push(Object.entries(data)[i][1].replen);
        replen.data = arrReplen;
        spend.data = arrSpend;
      }

      datasets.push(replen, spend);
    } else {
      let dataset = new Dataset('#116ACC');
      let dataArr = new Array();

      transactions.forEach((el) => {
        let mounth = new Date(el.date).getMonth();
        if (
          !Object.keys(data).includes(
            MOUTH[mounth].substring(0, 3).toUpperCase()
          )
        ) {
          data[MOUTH[mounth].substring(0, 3).toUpperCase()] = el.amount;
        } else {
          data[MOUTH[mounth].substring(0, 3).toUpperCase()] += el.amount;
        }
      });

      for (let i = 0; i < Object.entries(data).length; i++) {
        monthArr.push(Object.entries(data)[i][0]);
        dataArr.push(Object.entries(data)[i][1]);
      }

      dataset.data = dataArr;
      datasets.push(dataset);
    }

    Chart.register(
      BarController,
      BarElement,
      LinearScale,
      CategoryScale,
      Tooltip
    );
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: monthArr,
        datasets: datasets,
      },
      options: options,
    });
  } else {
    const voidWrapper = creatorTags('div', ['board__void']);
    const voidText = creatorTags(
      'p',
      ['board__void-text'],
      null,
      'Переводы пока не совершались'
    );

    voidWrapper.append(voidText);
    container.append(voidWrapper);
  }

  section.append(heading, container);
  return section;
}
