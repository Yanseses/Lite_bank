import { AUTH } from './mockData.js';
import { INPUT_ERRORS } from '../app/js/constants.js';
import { createAuth } from '../app/js/dom/createAuth.js';
import { authValid } from '../app/js/validations.js';

describe('Test correct render form', () => {
  test('Created auth form', () => {
    const createdAuthForm = createAuth();
    expect(createdAuthForm.outerHTML).toBe(AUTH.resultHTML);
  });
});

describe('Test front validation', () => {
  test('Correct data', () => {
    expect(authValid(AUTH.data.correct)).toEqual({ status: [true, true] });
  });
  test('Short login', () => {
    expect(authValid(AUTH.data.shortLogin)).toEqual({
      login: INPUT_ERRORS.authSmartStr,
      status: [false, true],
    });
  });
  test('Short password', () => {
    expect(authValid(AUTH.data.shortPass)).toEqual({
      password: INPUT_ERRORS.authSmartStr,
      status: [true, false],
    });
  });
  test('Short login and password', () => {
    expect(authValid(AUTH.data.shortAll)).toEqual({
      login: INPUT_ERRORS.authSmartStr,
      password: INPUT_ERRORS.authSmartStr,
      status: [false, false],
    });
  });
});
