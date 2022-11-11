import { INPUT_ERRORS } from './constants.js';

export function authValid(data) {
  const validation = new Object();
  let statusArr = new Array();

  for (const key in data) {
    if (data[key].length == 0) {
      statusArr.push(false);
      validation[key] = INPUT_ERRORS.curSmartStr;
    } else {
      if (data[key].length < 6) {
        statusArr.push(false);
        validation[key] = INPUT_ERRORS.authSmartStr;
      } else {
        statusArr.push(true);
      }
    }
  }
  validation.status = statusArr;

  return validation;
}

export function transactionValid(data) {
  const validation = new Object();
  let statusArr = new Array();

  for (const key in data) {
    switch (key) {
      case 'to': {
        if (data[key].length < 20) {
          statusArr.push(false);
          validation[key] = INPUT_ERRORS.transSmartStr;
        } else {
          statusArr.push(true);
        }
        break;
      }
      case 'amount': {
        if (data[key].length < 1) {
          statusArr.push(false);
          validation[key] = INPUT_ERRORS.curSmartStr;
        } else {
          if (data[key] <= 0) {
            statusArr.push(false);
            validation[key] = INPUT_ERRORS.transMinimal;
          } else {
            statusArr.push(true);
          }
        }
        break;
      }
    }
  }
  validation.status = statusArr;
  return validation;
}

export function exchangeCurValid(data) {
  const validation = new Object();
  let statusArr = new Array();

  if (data.amount.length < 1) {
    statusArr.push(false);
    validation.amount = INPUT_ERRORS.curSmartStr;
  } else {
    if (data.amount <= 0) {
      statusArr.push(false);
      validation.amount = INPUT_ERRORS.transMinimal;
    } else {
      statusArr.push(true);
    }
  }
  validation.status = statusArr;
  return validation;
}
