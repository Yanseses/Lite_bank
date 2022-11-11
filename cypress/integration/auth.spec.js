/// <reference types="cypress" />

describe('COIN: Авторизация пользователя', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.visit('http://localhost/dist');
  });
  const login = 'developer';
  const password = 'skillbox';

  context('Авторизация', () => {
    it('Валидация сервер: Пользователь не найден', () => {
      const shortLog = login.substring(0, 6);

      cy.get('input[class="auth-form__input"][name="login"]').type(shortLog);
      cy.get('input[class="auth-form__input"][name="password"]').type(password);
      cy.get('input[type="submit"]').click();
      cy.request({
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: 'http://localhost:3000/login',
        body: JSON.stringify({
          login: shortLog,
          password: password,
        }),
      }).then((res) => {
        expect(JSON.parse(res.body)).property('error').to.equal('No such user');
      });
      cy.get('.popup__description').should(
        'have.text',
        'Учетная запись не найдена. Проверьте корректнось заполнения полей.'
      );
    });

    it('Валидация сервер: Не корректный пароль', () => {
      const shortPass = password.substring(0, 6);

      cy.get('input[class="auth-form__input"][name="login"]').type(login);
      cy.get('input[class="auth-form__input"][name="password"]').type(
        shortPass
      );
      cy.get('input[type="submit"]').click();
      cy.request({
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: 'http://localhost:3000/login',
        body: JSON.stringify({
          login: login,
          password: shortPass,
        }),
      }).then((res) => {
        expect(JSON.parse(res.body)).property('error').to.equal('Invalid password');
      });
      cy.get('.popup__description').should(
        'have.text',
        'Не корректный пароль. Проверьте правильность заполнения и попробуйте еще раз.'
      );
    });

    it('Валидация фронт: логин короткий', () => {
      cy.get('input[class="auth-form__input"][name="login"]').type(
        login.substring(0, 4)
      );
      cy.get('input[class="auth-form__input"][name="password"]').type(password);
      cy.get('input[type="submit"]').click();
      cy.get('div[class="auth-form__error"][id="error-login"]').should(
        'have.text',
        'Длинна менее 6 символов'
      );
    });

    it('Валидация фронт: пароль короткий', () => {
      cy.get('input[class="auth-form__input"][name="login"]').type(login);
      cy.get('input[class="auth-form__input"][name="password"]').type(
        password.substring(0, 4)
      );
      cy.get('input[type="submit"]').click();
      cy.get('div[class="auth-form__error"][id="error-password"]').should(
        'have.text',
        'Длинна менее 6 символов'
      );
    });

    it('Валидация фронт: Поле логин пустое', () => {
      cy.get('input[class="auth-form__input"][name="password"]').type(password);
      cy.get('input[type="submit"]').click();
      cy.get('div[class="auth-form__error"][id="error-login"]').should(
        'have.text',
        'Поле не может быть пустым'
      );
    });

    it('Валидация фронт: Поле пароль пустое', () => {
      cy.get('input[class="auth-form__input"][name="login"]').type(login);
      cy.get('input[type="submit"]').click();
      cy.get('div[class="auth-form__error"][id="error-password"]').should(
        'have.text',
        'Поле не может быть пустым'
      );
    });

    it('Успешная авторизация', () => {
      cy.get('input[class="auth-form__input"][name="login"]').type(login);
      cy.get('input[class="auth-form__input"][name="password"]').type(password);
      cy.get('input[type="submit"]').click();
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
      });
      cy.window().then((win) => {
        const token = win.sessionStorage.getItem('token');
        cy.wrap(token).should('not.empty');
      });
    });
  });
});
