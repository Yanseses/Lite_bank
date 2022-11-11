import { CARDS, FILTER } from './mockData.js';
import { createCards, createFilter } from '../app/js/dom/createCard.js';

describe('Filter', () => {
  const createdFilter = createFilter();
  test('Created container to add to page', () => {
    expect(createdFilter.filterContainer.outerHTML).toEqual(FILTER.container);
  });
  test('Created button to add listener', () => {
    expect(createdFilter.filterBtn.outerHTML).toEqual(FILTER.button);
  });
  test('Created select list for filter', () => {
    expect(createdFilter.filterList.outerHTML).toEqual(FILTER.list);
  });
});

describe('Accounts list', () => {
  test('Received data from the server', () => {
    expect(createCards(CARDS.responce).outerHTML).toEqual(
      CARDS.resultHTML.correct
    );
  });
  test('Data not received from server', () => {
    expect(createCards({}).outerHTML).toEqual(CARDS.resultHTML.void);
  });
});
