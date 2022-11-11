/// <reference types="cypress" />

describe('COIN: Страница детального счета', () => {
  let account = '60628534212700553228853457';
  let accountTo = '51804315045206432423147538';
  let token;
  let amount;
  before(() => {
    const login = 'developer';
    const password = 'skillbox';
    cy.window().then((win) => {
      if (win.sessionStorage.length > 0) win.sessionStorage.clear();
    });
    cy.visit('http://localhost/dist');
    cy.get('input[class="auth-form__input"][name="login"]').type(login);
    cy.get('input[class="auth-form__input"][name="password"]').type(password);
    cy.get('.auth-form').submit();
    cy.request({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      url: 'http://localhost:3000/login',
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    }).then((el) => {
      token = JSON.parse(el.body).payload.token;
      cy.wrap(token).should('not.empty');
    });
    cy.wait(1000);
    cy.get('.card-list__wrapper-button:first').click();
  });

  context('Отрисовка блоков', () => {
    before('Ожидание рендера страницы', () => {
      cy.wait(1000);
    });

    it('Блок: контейнер графиков', () => {
      cy.get('.board--lite').should('be.visible');
      cy.get('.board > .board__heading').contains('Динамика баланса');
    });

    it('Блок: таблица транзакций', () => {
      cy.get('.history-table--lite').should('be.visible');
      cy.get('.history-table > .history-table__heading').contains('История переводов');
    });

    it('Блок: Переводы', () => {
      cy.get('.transaction').should('be.visible');
      cy.get('.transaction > .transaction__heading').contains('Новый перевод');
    });
  });

  context('Фронт: Переводы средств', () => {
    beforeEach('', () => {
      cy.get('.transaction__input[name="to"]').should('be.visible').clear();
      cy.get('.transaction__input[name="amount"]').should('be.visible').clear();
    });

    it('Фронт валидатор: Короткая длинна айди аккаунта получателя', () => {
      amount = 1;
      cy.get('input[name="to"]').type(accountTo.substring(1, 10));
      cy.get('input[name="amount"]').type(amount);
      cy.get('.transaction__form').submit();
      cy.get('.transaction__error[id="error-to"]').should('have.text', 'Длинна менее 20 символов');
      cy.get('.transaction__error[id="error-amount"]').should('not.have.text');
    });

    it('Фронт валидатор: Пустое поле айди получателя', () => {
      cy.get('input[name="amount"]').type('1');
      cy.get('.transaction__form').submit();
      cy.get('.transaction__error[id="error-to"]').should('have.text', 'Длинна менее 20 символов');
      cy.get('.transaction__error[id="error-amount"]').should('not.have.text');
    });

    it('Фронт валидатор: Значение суммы перевода меньше 0', () => {
      amount = '-1';
      cy.get('input[name="to"]').type(accountTo);
      cy.get('input[name="amount"]').type(amount);
      cy.get('.transaction__form').submit();
      cy.get('.transaction__error[id="error-to"]').should('not.have.text');
      cy.get('.transaction__error[id="error-amount"]').should('have.text', 'Значение не может быть нулевым или отрицательным');
    });

    it('Фронт валидатор: Значение равно 0', () => {
      amount = 0;
      cy.get('input[name="to"]').type(accountTo);
      cy.get('input[name="amount"]').type(amount);
      cy.get('.transaction__form').submit();
      cy.get('.transaction__error[id="error-to"]').should('not.have.text');
      cy.get('.transaction__error').should('have.text', 'Значение не может быть нулевым или отрицательным');
    });

    it('Фронт валидатор: Значения пустые', () => {
      cy.get('.transaction__form').submit();
      cy.get('.transaction__error[id="error-to"]').should('have.text', 'Длинна менее 20 символов');
      cy.get('.transaction__error[id="error-amount"]').should('have.text', 'Поле не может быть пустым');
    });
  });

  context('Бэк: Переводы средств между счетами', () => {
    afterEach(() => {
      cy.get('.popup__submit').click();
      cy.get('.transaction__input[name="to"]').should('be.visible').clear();
      cy.get('.transaction__input[name="amount"]').should('be.visible').clear();
    });

    it('Бэк валидатор: Недостаточно средств', () => {
      amount = 9999999;
      cy.get('.transaction__input[name="to"]').type(accountTo);
      cy.get('.transaction__input[name="amount"]').type(amount);
      cy.get('.transaction__form').submit();
      cy.request({
        headers: {
          'Content-Type': 'application/json',
          authorization: `Basic ${token}`,
        },
        method: 'POST',
        url: 'http://localhost:3000/transfer-funds',
        body: JSON.stringify({
          from: account,
          to: accountTo,
          amount: amount,
        })
      }).then((res) => {
        cy.wrap(JSON.parse(res.body).payload).should('eq', null);
        cy.wrap(JSON.parse(res.body).error).should('eq', 'Overdraft prevented')
      });
    });

    it('Бэк валидатор: Получатель не найден', () => {
      amount = 10;
      cy.get('.transaction__input[name="to"]').type('9999999999999999999999999');
      cy.get('.transaction__input[name="amount"]').type(amount);
      cy.get('.transaction__form').submit();
      cy.request({
        headers: {
          'Content-Type': 'application/json',
          authorization: `Basic ${token}`,
        },
        method: 'POST',
        url: 'http://localhost:3000/transfer-funds',
        body: JSON.stringify({
          from: account,
          to: '9999999999999999999999999',
          amount: amount,
        })
      }).then((res) => {
        cy.wrap(JSON.parse(res.body).payload).should('eq', null);
        cy.wrap(JSON.parse(res.body).error).should('eq', 'Invalid account to')
      });
    });
  });

  it('Бэк валидатор: Перевести корректное кол-во средств', () => {
    amount = 1;
    cy.get('.transaction__input[name="to"]').type(accountTo);
    cy.get('.transaction__input[name="amount"]').type(amount);
    cy.get('.transaction__form').submit();
    cy.request({
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${token}`,
      },
      method: 'POST',
      url: 'http://localhost:3000/transfer-funds',
      body: JSON.stringify({
        from: account,
        to: accountTo,
        amount: amount,
      })
    }).then((res) => {
      cy.wrap(JSON.parse(res.body).payload).should('not.be.empty');
      cy.wrap(JSON.parse(res.body).error).should('be.empty')
    });
  });
});
