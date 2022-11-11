/// <reference types="cypress" />

describe('COIN: Страница конвертации валют', () => {
  let amount;
  let token;
  before(() => {
    cy.window().then((win) => {
      if (win.sessionStorage.length > 0) win.sessionStorage.clear();
    });
    cy.visit('http://localhost/dist');
    cy.get('input[class="auth-form__input"][name="login"]').type('developer');
    cy.get('input[class="auth-form__input"][name="password"]').type('skillbox');
    cy.get('.auth-form').submit();
    cy.request({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      url: 'http://localhost:3000/login',
      body: JSON.stringify({
        login: 'developer',
        password: 'skillbox',
      }),
    }).then((el) => {
      token = JSON.parse(el.body).payload.token;
      cy.wrap(token).should('not.empty');
    });
    cy.get('[class="nav-list__item"][id="currencies"]').click();
  });

  context('Отрисовка блоков', () => {
    before('Подождать отрисовки', () => {
      cy.wait(1000);
    });

    it('Блок: список валют', () => {
      cy.get('.your-cur').should('be.visible');
      cy.get('.your-cur > .your-cur__subheading').contains('Ваши валюты');
    });

    it('Блок: форма конвертации валют', () => {
      cy.get('.exchange').should('be.visible');
      cy.get('.exchange > .exchange__subheading').contains('Обмен валют');
    });

    it('Блок: изменение курсов валют', () => {
      cy.get('.change').should('be.visible');
      cy.get('.change > .change__subheading').contains('Изменение курсов в реальном времени');
    })
  });

  context('Конвертация валют', () => {
    beforeEach(() => {
      cy.get('.exchange__input').should('be.visible').clear();
    });

    it('Бэк валидатор: Конвертировать корректное кол-во средств', () => {
      amount = 1;
      cy.get('input[name="amount"]').type(amount);
      cy.get('.exchange__form').submit();
      cy.request({
        headers: {
          'Content-Type': 'application/json',
          authorization: `Basic ${token}`,
        },
        method: 'POST',
        url: 'http://localhost:3000/currency-buy',
        body: JSON.stringify({
          amount: amount,
          from: "BTC",
          to: "CNH",
        })
      }).then((res) => {
        cy.wrap(JSON.parse(res.body).payload).should('not.be.empty');
        cy.wrap(JSON.parse(res.body).error).should('be.empty')
      });
    });

    it('Бэк валидатор: Неизвестный код валюты', () => {
      amount = 1;
      cy.get('input[name="amount"]').type(amount);
      cy.get('.exchange__form').submit();
      cy.request({
        headers: {
          'Content-Type': 'application/json',
          authorization: `Basic ${token}`,
        },
        method: 'POST',
        url: 'http://localhost:3000/currency-buy',
        body: JSON.stringify({
          amount: amount,
          from: "BT",
          to: "CNH",
        })
      }).then((res) => {
        cy.wrap(JSON.parse(res.body).payload).should('be.null');
        cy.wrap(JSON.parse(res.body).error).should('eq', 'Unknown currency code')
      });
    });

    it('Бэк валидатор: Недостаточно средств', () => {
      amount = 9999;
      cy.get('input[name="amount"]').type(amount);
      cy.get('.exchange__form').submit();
      cy.request({
        headers: {
          'Content-Type': 'application/json',
          authorization: `Basic ${token}`,
        },
        method: 'POST',
        url: 'http://localhost:3000/currency-buy',
        body: JSON.stringify({
          amount: amount,
          from: "CAD",
          to: "BTC",
        })
      }).then((res) => {
        cy.wrap(JSON.parse(res.body).payload).should('be.null');
        cy.wrap(JSON.parse(res.body).error).should('eq', 'Overdraft prevented')
      });
    });

    it('Фронт валидатор: Значение меньше 0', () => {
      cy.get('input[name="amount"]').type('-1');
      cy.get('.exchange__form').submit();
      cy.get('.exchange__input--error').should('be.visible');
      cy.get('.exchange__error-value').should('have.text', 'Значение не может быть нулевым или отрицательным');
    });

    it('Фронт валидатор: Значение равно 0', () => {
      cy.get('input[name="amount"]').type('0');
      cy.get('.exchange__form').submit();
      cy.get('.exchange__input--error').should('be.visible');
      cy.get('.exchange__error-value').should('have.text', 'Значение не может быть нулевым или отрицательным');
    });

    it('Фронт валидатор: Значение пустое', () => {
      cy.get('.exchange__form').submit();
      cy.get('.exchange__input--error').should('be.visible');
      cy.get('.exchange__error-value').should('have.text', 'Поле не может быть пустым');
    });
  });
});
