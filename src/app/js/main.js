import '../scss/style.scss';
import logo from '../images/logo.svg';
import { creatorTags } from './creatorTags.js';
import { createSection } from './dom/createSection.js';
import { createHeader, createNav } from './dom/createHeader.js';
import { loader } from './dom/loader.js';
import { PAGES, CARD_PAGE, PAGE_ERRORS } from './constants.js';
import ymaps from 'ymaps';

const auth = sessionStorage.getItem('token');
const createdHeader = createHeader(logo);
const creatdeMain = creatorTags('main', ['main']);
const createdNav = createNav();
const CACHES = new Object();
document.body.append(createdHeader.header, creatdeMain);

if (auth == null) {
  renderPage(PAGES.auth);
} else {
  const page = location.pathname;
  switch (page) {
    case '/card': {
      changeNav(PAGES.card);
      break;
    }
    case '/banks': {
      changeNav(PAGES.banks);
      break;
    }
    case '/currencies': {
      changeNav(PAGES.currencies);
      break;
    }
    default: {
      changeNav(PAGES.card);
      break;
    }
  }
}

// Работа навигации
createdNav.navList.addEventListener('click', function (e) {
  if (e.target.classList.contains('nav-list__item')) changeNav(e.target.id);
});

window.addEventListener('popstate', function (e) {
  if (e.state.page === 'auth' && sessionStorage.setItem('token')) {
    changeNav(PAGES.card);
    return;
  }
  changeNav(e.state.page);
});

// Функция отрисовки основной части страницы
async function renderPage(page) {
  const token = sessionStorage.getItem('token');
  const createdPage = createSection(page);
  const spinner = loader({ type: 'spinner' });
  if (document.body.classList.contains('no-scroll')) {
    if (document.querySelector('.loader')) {
      const addedLoader = document.querySelector('.loader');
      addedLoader.remove();
    }
    document.body.classList.remove('no-scroll');
  }
  if (page !== PAGES.auth) {
    createdHeader.container.append(createdNav.navigation);
  }

  switch (page) {
    case 'auth': {
      let { createAuth } = await import('./dom/createAuth.js');
      let { authValid } = await import('./validations.js');
      let { getLogin } = await import('./data.js');
      const createdAuth = createAuth();

      createdAuth.addEventListener('submit', function (e) {
        e.preventDefault();

        const authForm = new Object();
        const inputs = this.querySelectorAll('.auth-form__input');
        const errorWraper = this.querySelectorAll('.auth-form__error');
        for (let i = 0; i < inputs.length; i++) {
          authForm[inputs[i].name] = inputs[i].value;
          if (inputs[i].classList.contains('auth-form__input--error')) {
            inputs[i].classList.remove('auth-form__input--error');
            errorWraper[i].innerHTML = '';
          }
        }
        const validation = authValid(authForm);
        if (!validation.status.includes(false)) {
          document.body.classList.add('no-scroll');
          document.body.append(spinner.container);

          getLogin(authForm)
            .then((el) => {
              sessionStorage.setItem(Object.keys(el.payload), el.payload.token);
              changeNav(PAGES.card);
            })
            .catch((error) => {
              popUpWindow(spinner, error);
            });
        } else {
          inputs.forEach((input) => {
            if (validation[input.name]) {
              input.classList.add('auth-form__input--error');
              errorWraper.forEach((element) => {
                if (element.id == `error-${input.name}`) {
                  element.innerHTML = validation[input.name];
                  return;
                }
              });
            }
          });
        }
      });

      createdPage.section.append(createdAuth);
      break;
    }
    case 'card': {
      let { createCards, createFilter } = await import('./dom/createCard.js');
      let { getAccounts, createAccount } = await import('./data.js');
      let createdCards;
      let accountData;
      const filter = createFilter();
      const newAccount = creatorTags(
        'button',
        ['card__new-account'],
        { type: 'button', disabled: 'disabled' },
        CARD_PAGE.newAccount
      );
      const transitionToCard = function (e) {
        if (e.target.id) {
          history.pushState(
            { page: PAGES.detail },
            null,
            `/${PAGES.card}/${e.target.id}`
          );
          changeNav(PAGES.detail);
        }
      };

      createdPage.headPage.append(filter.filterContainer, newAccount);

      if (CACHES.card) {
        filter.filterBtn.removeAttribute('disabled');
        accountData = CACHES.card;
        createdCards = createCards(accountData);
        createdPage.section.append(createdCards);

        createdCards.addEventListener('click', transitionToCard);
      } else {
        createdCards = loader({ type: 'skeleton', page: 'card' });
        createdPage.section.append(createdCards);
      }

      getAccounts(token)
        .then((el) => {
          newAccount.removeAttribute('disabled');
          if (JSON.stringify(CACHES.card) !== JSON.stringify(el.payload)) {
            createdCards.removeEventListener('click', transitionToCard);
            filter.filterBtn.removeAttribute('disabled');
            CACHES.card = el.payload;
            createdCards.remove();
            accountData = el.payload;
            createdCards = createCards(accountData);
            createdPage.section.append(createdCards);
          }

          createdCards.addEventListener('click', transitionToCard);
        })
        .catch((err) => {
          if (!CACHES.card) {
            createdCards.remove();
            createdCards = createCards(err);
            createdPage.section.append(createdCards);
          }
        });

      newAccount.addEventListener('click', () => {
        document.body.classList.add('no-scroll');
        document.body.append(spinner.container);

        createAccount(token)
          .then(() => {
            changeNav(PAGES.card);
          })
          .catch((error) => {
            popUpWindow(spinner, error);
          });
      });

      filter.filterBtn.addEventListener('click', (e) => {
        e.preventDefault();

        filter.filterList.classList.toggle('select-list--hide');
        filter.filterBtn.classList.toggle('filter__btn--rotate');
      });

      filter.filterList.addEventListener('click', (e) => {
        const items = filter.filterList.querySelectorAll('.select-list__item');
        items.forEach((el) => {
          if (el.id == e.target.id) {
            el.classList.add('select-list__item--select');
            switch (el.id) {
              case 'balance': {
                accountData.sort((a, b) => b.balance - a.balance);
                break;
              }
              case 'number': {
                accountData.sort((a, b) => b.account - a.account);
                break;
              }
              case 'lastTransaction': {
                accountData.sort((a, b) => {
                  let dateA = new Date(
                    a.transactions[0] == undefined
                      ? '1980-01-01'
                      : a.transactions[0].date
                  );
                  let dateB = new Date(
                    b.transactions[0] == undefined
                      ? '1980-01-01'
                      : b.transactions[0].date
                  );
                  return dateB - dateA;
                });
                break;
              }
            }
            createdCards.remove();
            createdCards = createCards(accountData);
            createdPage.section.append(createdCards);
            filter.filterBtn.textContent = el.textContent;

            createdCards.addEventListener('click', (e) => {
              transitionToCard(e);
            });
          } else {
            el.classList.remove('select-list__item--select');
          }
        });
        filter.filterList.classList.add('select-list--hide');
        filter.filterBtn.classList.remove('filter__btn--rotate');
      });
      break;
    }
    case 'currencies': {
      let {
        createYourCur,
        createChangeCur,
        createCurExchange,
        createItemChange,
      } = await import('./dom/createCurrency.js');
      let { getCurrensAccount, doExchange } = await import('./data.js');
      let { exchangeCurValid } = await import('./validations.js');
      const createdChangeCur = createChangeCur();
      let currenciWrapp;
      let currensType = new Object();
      let createdYourCur;
      let createdCurExchange;

      if (CACHES.currencies) {
        currenciWrapp = creatorTags('section', ['currencies__wrapper']);
        for (const key in CACHES.currencies) {
          currensType[key] = key;
        }
        createdYourCur = createYourCur(CACHES.currencies);
        createdCurExchange = createCurExchange(currensType);
        currenciWrapp.append(
          createdYourCur,
          createdCurExchange.container,
          createdChangeCur.container
        );
        createdPage.section.append(currenciWrapp);

        createdCurExchange.form.addEventListener('submit', (e) => {
          e.preventDefault();

          processingForm();
        });
      } else {
        currenciWrapp = loader({ type: 'skeleton', page: 'currencies' });
        createdPage.section.append(currenciWrapp);
      }

      getCurrensAccount(token)
        .then((el) => {
          if (
            JSON.stringify(CACHES.currencies) !== JSON.stringify(el.payload)
          ) {
            CACHES.currencies = el.payload;
            currenciWrapp.innerHTML = '';
            for (const key in el.payload) {
              currensType[key] = key;
            }
            createdYourCur = createYourCur(el.payload);
            createdCurExchange = createCurExchange(currensType);
            currenciWrapp.append(
              createdYourCur,
              createdCurExchange.container,
              createdChangeCur.container
            );

            createdCurExchange.form.addEventListener('submit', (e) => {
              e.preventDefault();

              processingForm();
            });

            createdPage.section.append(currenciWrapp);
          }
        })
        .catch((err) => {
          if (!CACHES.currencies) {
            currenciWrapp.innerHTML = '';
            const createdYourCur = createYourCur(err);
            const createdCurExchange = createCurExchange(err);

            currenciWrapp.append(
              createdYourCur,
              createdCurExchange.container,
              createdChangeCur.container
            );
            createdPage.section.append(currenciWrapp);
          }
        });

      // eslint-disable-next-line no-inner-declarations
      function processingForm() {
        const data = new Object();
        const amount = document.querySelector('.exchange__input');
        const errorIcon = document.querySelector('.exchange__error');
        const errorValue = document.querySelector('.exchange__error-value');
        if (amount.classList.contains('exchange__input--error')) {
          amount.classList.remove('exchange__input--error');
          errorIcon.classList.remove('exchange__error--active');
          errorValue.innerHTML = '';
        }
        data[amount.name] = amount.value;
        const validation = exchangeCurValid(data);
        if (!validation.status.includes(false)) {
          const buttons = document.querySelectorAll('.exchange__button');
          for (let i = 0; i < buttons.length; i++) {
            data[buttons[i].name] = buttons[i].textContent;
          }

          document.body.classList.add('no-scroll');
          document.body.append(spinner.container);

          doExchange(token, data)
            .then(() => {
              changeNav(PAGES.currencies);
            })
            .catch((error) => {
              popUpWindow(spinner, error);
            });
        } else {
          amount.classList.add('exchange__input--error');
          errorIcon.classList.add('exchange__error--active');
          errorValue.innerHTML = validation.amount;
        }
      }

      let socket = new WebSocket('ws://localhost:3000/currency-feed');
      socket.onmessage = function (e) {
        const changeList = createdChangeCur.changeList;
        const itemChange = createItemChange(JSON.parse(e.data));
        changeList.prepend(itemChange);
        if (changeList.children.length > 50) {
          let finalItem = changeList.lastElementChild;
          changeList.removeChild(finalItem);
        }
      };

      socket.onerror = function (e) {
        const itemChange = createItemChange(e);
        createdChangeCur.changeList.append(itemChange);
      };
      break;
    }
    case 'banks': {
      let { getBanks } = await import('./data.js');
      let pointsArr = new Array();
      let mapContent;
      const mapContainer = creatorTags('div', ['banks__container']);

      if (CACHES.banks) {
        getPoints(CACHES.banks);
        createdMap();
      } else {
        mapContent = loader({ type: 'skeleton', page: 'banks' });
        createdPage.section.append(mapContent);
      }

      getBanks(token)
        .then((points) => {
          if (JSON.stringify(CACHES.banks) !== JSON.stringify(points.payload)) {
            CACHES.banks = points.payload;
            mapContent.remove();
            getPoints(points.payload);
            createdMap();
          }
        })
        .catch(() => {
          if (!CACHES.banks) {
            mapContent.remove();
            const errorWrapper = creatorTags('div', ['error__item']);
            const errorText = creatorTags(
              'p',
              ['error__text'],
              null,
              PAGE_ERRORS.notConnect
            );
            errorWrapper.append(errorText);
            mapContainer.append(errorWrapper);
            createdPage.section.append(mapContainer);
          }
        });

      // eslint-disable-next-line no-inner-declarations
      function getPoints(points) {
        points.forEach((el) => {
          const point = new Object();
          const geometry = new Object();
          const coordinate = new Array();
          point.type = 'Feature';
          point.geometry = geometry;
          coordinate.push(el.lat, el.lon);
          geometry.type = 'Point';
          geometry.coordinates = coordinate;
          pointsArr.push(point);
        });
      }

      // eslint-disable-next-line no-inner-declarations
      function createdMap() {
        ymaps
          .load('https://api-maps.yandex.ru/2.1/?lang=ru_RU')
          .then((map) => {
            let yaMap = new map.Map(
              mapContainer,
              {
                center: [55.76, 37.64],
                zoom: 9,
              },
              {
                searchControlProvider: 'yandex#search',
              }
            );
            let objectManager = new map.ObjectManager({
              clusterize: true,
              gridSize: 32,
              clusterDisableClickZoom: true,
            });

            objectManager.objects.options.set('preset', 'islands#greenDotIcon');
            objectManager.clusters.options.set(
              'preset',
              'islands#greenClusterIcons'
            );
            yaMap.geoObjects.add(objectManager);

            objectManager.add(pointsArr);
          })
          .catch((err) => {
            alert('Ya Map failed. Error: ', err);
          });

        createdPage.section.append(mapContainer);
      }
      break;
    }
    case 'detail': {
      let { createTransSection } = await import('./dom/createDetail.js');
      let {
        createParameters,
        createHistoryTable,
        createBalanceBoard,
        createBackBtn,
      } = await import('./dom/createHistoryParam.js');
      let { getAccount, doAccountTrans } = await import('./data.js');
      let { transactionValid } = await import('./validations.js');
      const backBtn = createBackBtn(PAGES.detail);
      const pageLocation = location.pathname;
      const accountId = pageLocation.substring(6);
      const transaction = createTransSection(accountId);
      let detailMain;
      let parameters;
      let historyTable;
      let balanceBoard;

      createdPage.headPage.append(backBtn);

      if (CACHES[accountId]) {
        backBtn.removeAttribute('disabled');
        detailMain = creatorTags('section', ['detail__main']);
        parameters = createParameters(accountId, CACHES[accountId].balance);
        historyTable = createHistoryTable(
          accountId,
          CACHES[accountId].transactions,
          10
        );
        balanceBoard = createBalanceBoard(CACHES[accountId].transactions);

        detailMain.append(transaction.section, balanceBoard, historyTable);
        createdPage.headPage.append(backBtn, parameters);
        createdPage.section.append(detailMain);

        if (CACHES[accountId].transactions.length > 0) {
          historyTable.addEventListener('click', transToHistory);
          balanceBoard.addEventListener('click', transToHistory);
        }
      } else {
        detailMain = loader({ type: 'skeleton', page: 'detail' });
        parameters = createParameters(accountId);
        createdPage.headPage.append(parameters);
        createdPage.section.append(detailMain);
      }

      backBtn.addEventListener('click', (e) => {
        e.preventDefault();

        changeNav(PAGES.card);
      });

      getAccount(token, accountId)
        .then((el) => {
          if (
            JSON.stringify(CACHES[accountId]) !== JSON.stringify(el.payload)
          ) {
            CACHES[accountId] = el.payload;
            detailMain.remove();
            backBtn.removeAttribute('disabled');
            if (balanceBoard !== undefined || historyTable !== undefined)
              detailMain.innerHTML = '';
            if (parameters !== undefined) parameters.innerHTML = '';
            detailMain = creatorTags('section', ['detail__main']);
            parameters = createParameters(accountId, el.payload.balance);
            historyTable = createHistoryTable(
              accountId,
              el.payload.transactions,
              10
            );
            balanceBoard = createBalanceBoard(el.payload.transactions);

            detailMain.append(transaction.section, balanceBoard, historyTable);
            createdPage.headPage.append(parameters);
            createdPage.section.append(detailMain);

            if (el.payload.transactions.length > 0) {
              historyTable.addEventListener('click', transToHistory);
              balanceBoard.addEventListener('click', transToHistory);
            }
          }
        })
        .catch(() => {
          if (!CACHES[accountId]) {
            detailMain.remove();
            backBtn.removeAttribute('disabled');
            detailMain = creatorTags('section', [
              'detail__main',
              'detail__main--error',
            ]);
            const errorSection = creatorTags('section', [
              'error',
              'error--wrap',
            ]);
            const errorWrapper = creatorTags('div', ['error__item']);
            const errorText = creatorTags(
              'p',
              ['error__text'],
              null,
              PAGE_ERRORS.notConnect
            );

            errorWrapper.append(errorText);
            errorSection.append(errorWrapper);
            detailMain.append(errorSection);
            createdPage.section.append(detailMain);
          }
        });

      // eslint-disable-next-line no-inner-declarations
      function transToHistory() {
        history.pushState(
          { page: PAGES.history },
          null,
          `/${PAGES.card}/${accountId}/${PAGES.history}`
        );
        changeNav(PAGES.history);
      }

      transaction.transForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const data = new Object();
        const inputs = this.querySelectorAll('.transaction__input');
        const errorWraper = this.querySelectorAll('.transaction__error');
        for (let i = 0; i < inputs.length; i++) {
          data[inputs[i].name] = inputs[i].value;
          if (inputs[i].classList.contains('transaction__input--error')) {
            inputs[i].classList.remove('transaction__input--error');
            errorWraper[i].innerHTML = '';
          }
        }
        const validation = transactionValid(data);
        if (!validation.status.includes(false)) {
          data.from = accountId;
          const accounts = localStorage.getItem('accounts')
            ? JSON.parse(localStorage.getItem('accounts'))
            : new Array();
          const checker =
            accounts.length > 0
              ? accounts.map((el) => el.value !== data.to)
              : new Array(true);
          const storeAccount = new Object();
          storeAccount.id = accountId;
          storeAccount.value = data.to;
          !checker.includes(false) ? accounts.push(storeAccount) : '';
          localStorage.setItem('accounts', JSON.stringify(accounts));

          document.body.classList.add('no-scroll');
          document.body.append(spinner.container);

          doAccountTrans(token, data)
            .then(() => {
              changeNav(PAGES.detail);
            })
            .catch((error) => {
              popUpWindow(spinner, error);
            });
        } else {
          inputs.forEach((input) => {
            if (validation[input.name]) {
              input.classList.add('transaction__input--error');
              errorWraper.forEach((element) => {
                if (element.id == `error-${input.name}`) {
                  element.innerHTML = validation[input.name];
                  return;
                }
              });
            }
          });
        }
      });
      break;
    }
    case 'history': {
      let {
        createParameters,
        createHistoryTable,
        createBalanceBoard,
        createBackBtn,
      } = await import('./dom/createHistoryParam.js');
      let { getAccount } = await import('./data.js');
      const backBtn = createBackBtn(PAGES.history);
      const pageLocation = location.pathname;
      const accountId = pageLocation.substring(6, 32);
      let historyMain;
      let parameters;
      let historyTable;
      let balanceBoard;
      let detailBoard;

      createdPage.headPage.append(backBtn);

      if (CACHES[accountId]) {
        backBtn.removeAttribute('disabled');
        historyMain = creatorTags('section', ['history__main']);
        parameters = createParameters(accountId, CACHES[accountId].balance);
        historyTable = createHistoryTable(
          accountId,
          CACHES[accountId].transactions,
          25
        );
        balanceBoard = createBalanceBoard(
          CACHES[accountId].transactions,
          'balance'
        );
        detailBoard = createBalanceBoard(
          CACHES[accountId].transactions,
          'ratio',
          accountId
        );

        historyMain.append(balanceBoard, detailBoard, historyTable);
        createdPage.headPage.append(parameters);
        createdPage.section.append(historyMain);
      } else {
        historyMain = loader({ type: 'skeleton', page: 'history' });
        parameters = createParameters(accountId);
        createdPage.headPage.append(parameters);
        createdPage.section.append(historyMain);
      }

      backBtn.addEventListener('click', (e) => {
        e.preventDefault();

        history.pushState(
          { page: PAGES.detail },
          null,
          `/${PAGES.card}/${accountId}`
        );
        changeNav(PAGES.detail);
      });

      getAccount(token, accountId)
        .then((el) => {
          if (
            JSON.stringify(CACHES[accountId]) !== JSON.stringify(el.payload)
          ) {
            historyMain.remove();
            backBtn.removeAttribute('disabled');
            historyMain = creatorTags('section', ['history__main']);
            if (balanceBoard !== undefined || historyTable !== undefined)
              historyMain.innerHTML = '';
            if (parameters !== undefined) parameters.innerHTML = '';
            parameters = createParameters(accountId, el.payload.balance);
            historyTable = createHistoryTable(
              accountId,
              el.payload.transactions,
              25
            );
            balanceBoard = createBalanceBoard(el.payload.transactions);
            detailBoard = createBalanceBoard(el.payload.transactions);

            historyMain.append(balanceBoard, detailBoard, historyTable);
            createdPage.headPage.append(parameters);
            createdPage.section.append(historyMain);
          }
        })
        .catch(() => {
          if (!CACHES[accountId]) {
            historyMain.remove();
            historyMain = creatorTags('section', ['history__main']);
            const errorSection = creatorTags('section', [
              'error',
              'error--wrap',
            ]);
            const errorWrapper = creatorTags('div', ['error__item']);
            const errorText = creatorTags(
              'p',
              ['error__text'],
              null,
              PAGE_ERRORS.notConnect
            );
            const parameters = createParameters(accountId);

            errorWrapper.append(errorText);
            errorSection.append(errorWrapper);
            historyMain.append(parameters, errorSection);
            createdPage.section.append(historyMain);
          }
        });
      break;
    }
  }

  creatdeMain.innerHTML = '';
  creatdeMain.append(createdPage.section);
}

// Вспомогательные функции
function changeNav(state) {
  renderPage(state);
  const navItems = document.querySelectorAll('.nav-list__item');
  const navigation = document.querySelector('.navigation');
  const navList = document.querySelector('.nav-list');
  navItems.forEach((el) => {
    el.id == state
      ? el.classList.add('nav-list__item--active')
      : el.classList.remove('nav-list__item--active');
  });
  if (navList.classList.contains('nav-list--active')) {
    const burger = document.querySelector('.navigation__burger');
    navList.classList.remove('nav-list--active');
    burger.classList.remove('navigation__burger--active');
  }
  if (state) {
    switch (state) {
      case 'card':
      case 'banks':
      case 'currencies': {
        history.pushState({ page: state }, null, `/${state}`);
        break;
      }
      case 'auth': {
        history.pushState({ page: state }, null, `/${state}`);
        navigation.remove();
        sessionStorage.clear();
        break;
      }
    }
  }
}

async function popUpWindow(spinner, error) {
  let { popup } = await import('./dom/popup.js');
  const popUp = popup(error);
  spinner.spinner.remove();
  spinner.container.append(popUp.container);

  popUp.confirmBtn.addEventListener('click', () => {
    closePopUp(spinner);
  });

  popUp.cross.addEventListener('click', () => {
    closePopUp(spinner);
  });
}

function closePopUp(spinner) {
  spinner.container.innerHTML = '';
  spinner.container.append(spinner.spinner);
  spinner.container.remove();
  document.body.classList.remove('no-scroll');
}
