import { DETAIL, HISTORY_TABLE } from './mockData.js';
import { createTransSection } from '../app/js/dom/createDetail.js';
import {
  createParameters,
  createHistoryTable,
  createBalanceBoard,
} from '../app/js/dom/createHistoryParam.js';
import { transactionValid } from '../app/js/validations.js';

describe('Create transaction form', () => {
  const createdTransSection = createTransSection(DETAIL.account);
  test('Created full transaction section', () => {
    expect(createdTransSection.section.outerHTML).toEqual(
      DETAIL.transSection.outputSection
    );
  });
  test('Created transaction form', () => {
    expect(createdTransSection.transForm.outerHTML).toEqual(
      DETAIL.transSection.outputForm
    );
  });
});

// describe('Check correct validation', () => {
//   test('', () => {
//     expect(transactionValid()).toEqual();
//   });
//   test('', () => {
//     expect(transactionValid()).toEqual();
//   });
//   test('', () => {
//     expect(transactionValid()).toEqual();
//   });
//   test('', () => {
//     expect(transactionValid()).toEqual();
//   });
// });

describe('Create parameters for head main', () => {
  test('Сreated transaction section without balance', () => {
    expect(createParameters(DETAIL.account).outerHTML).toEqual(DETAIL.parameters.outputNoBalance);
  });
  test('Created parameters section with balance', () => {
    expect(
      createParameters(DETAIL.account, DETAIL.parameters.inputBalance).outerHTML
    ).toEqual(DETAIL.parameters.outputHaveBalance);
  });
});

describe('Create history table', () => {
  test('Created full history table (10 elements)', () => {
    expect(
      createHistoryTable(DETAIL.account, HISTORY_TABLE.full).outerHTML
    ).toEqual(DETAIL.historyTable.tableOutputFull);
  });
  test('Created void history table (0 elements)', () => {
    expect(
      createHistoryTable(DETAIL.account, HISTORY_TABLE.void).outerHTML
    ).toEqual(DETAIL.historyTable.tableOutputVoid);
  });
});

describe('Create balance board', () => {
  test('Created full balance board', () => {
    expect(createBalanceBoard(HISTORY_TABLE.full).outerHTML).toEqual(
      DETAIL.board.boardOutputFull
    );
  });
  test('Created void balance board', () => {
    expect(createBalanceBoard(HISTORY_TABLE.void).outerHTML).toEqual(
      DETAIL.board.boardOutputVoid
    );
  });
});
