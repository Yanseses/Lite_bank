import { creatorTags } from '../creatorTags.js';
import { BUTTONS, AUTH_PAGE } from '../constants.js';

export function createAuth() {
  const authForm = creatorTags('form', ['auth-form']);
  const loginLabel = creatorTags('label', ['auth-form__label'], {
    for: 'login',
  });
  const loginText = creatorTags(
    'p',
    ['auth-form__label-text'],
    null,
    AUTH_PAGE.labelLog
  );
  const loginInput = creatorTags('input', ['auth-form__input'], {
    name: 'login',
    type: 'text',
    placeholder: AUTH_PAGE.placeLog,
    autocomplete: 'off',
  });
  const loginErrors = creatorTags('div', ['auth-form__error'], {
    id: 'error-login',
  });
  const pasLabel = creatorTags('label', ['auth-form__label'], {
    for: 'password',
  });
  const pasText = creatorTags(
    'p',
    ['auth-form__label-text'],
    null,
    AUTH_PAGE.labelPas
  );
  const pasInput = creatorTags('input', ['auth-form__input'], {
    name: 'password',
    type: 'password',
    placeholder: AUTH_PAGE.placePas,
    autocomplete: 'off',
  });
  const pasErrors = creatorTags('div', ['auth-form__error'], {
    id: 'error-password',
  });
  const passBtn = creatorTags(
    'button',
    ['auth-form__input-btn', 'auth-form__input-btn--close'],
    { type: 'button' }
  );
  const submit = creatorTags('input', ['auth-form__submit'], {
    type: 'submit',
    value: BUTTONS.auth,
  });

  loginLabel.append(loginText, loginInput, loginErrors);
  pasLabel.append(pasText, pasInput, passBtn, pasErrors);
  authForm.append(loginLabel, pasLabel, submit);

  passBtn.addEventListener('mousedown', () => {
    pasInput.type = 'text';
    passBtn.classList.remove('auth-form__input-btn--close');
    passBtn.classList.add('auth-form__input-btn--open');
  });

  passBtn.addEventListener('mouseup', () => {
    pasInput.type = 'password';
    passBtn.classList.remove('auth-form__input-btn--open');
    passBtn.classList.add('auth-form__input-btn--close');
  });

  return authForm;
}
