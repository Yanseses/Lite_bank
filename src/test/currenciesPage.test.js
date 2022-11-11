import { CURRENCIES } from './mockData.js';
import {
  createChangeCur,
  createYourCur,
  createCurExchange,
} from '../app/js/dom/createCurrency.js';
import { exchangeCurValid } from '../app/js/validations.js';

describe('Create exchange section and including everything elements', () => {
  const createdCurExchange = createCurExchange(
    CURRENCIES.exchangeSection.inputData
  );
  test('Created full exchange section', () => {
    expect(createdCurExchange.container.outerHTML).toEqual(
      CURRENCIES.exchangeSection.outputData.container
    );
  });
  test('Created only exchange form', () => {
    expect(createdCurExchange.form.outerHTML).toEqual(
      CURRENCIES.exchangeSection.outputData.form
    );
  });
});

describe('Test exchange validation', () => {
  test('Validation exchange currencies negative value', () => {
    expect(exchangeCurValid(CURRENCIES.validation.inputData1)).toEqual(
      CURRENCIES.validation.outputData1
    );
  });
  test('Validation exchange currencies zerro value', () => {
    expect(exchangeCurValid(CURRENCIES.validation.inputData2)).toEqual(
      CURRENCIES.validation.outputData2
    );
  });
  test('Validation exchange currencies void value', () => {
    expect(exchangeCurValid(CURRENCIES.validation.inputData3)).toEqual(
      CURRENCIES.validation.outputData3
    );
  });
  test('Validation exchange currencies correct value', () => {
    expect(exchangeCurValid(CURRENCIES.validation.inputData4)).toEqual(
      CURRENCIES.validation.outputData4
    );
  });
});

describe('Create your currencies section and including everything elements', () => {
  const createdYourCur = createYourCur(CURRENCIES.yourSection.inputData);
  test('Created full your cur section', () => {
    expect(createdYourCur.outerHTML).toEqual(CURRENCIES.yourSection.outputData);
  });
});

describe('Create change section and including everything elements', () => {
  const createdChangeCur = createChangeCur();
  test('Created full change section', () => {
    expect(createdChangeCur.container.outherHTML).toEqual(
      CURRENCIES.changeSection.container
    );
  });
  test('Created only change list', () => {
    expect(createdChangeCur.changeList.outherHTML).toEqual(
      CURRENCIES.changeSection.list
    );
  });
});
