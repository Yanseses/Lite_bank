import { creatorTags } from '../creatorTags.js';
import { POPUP_ERRORS } from '../constants.js';

export function popup(error) {
  const container = creatorTags('div', ['popup']);
  const headPopUp = creatorTags('div', ['popup__head']);
  const heading = creatorTags(
    'h3',
    ['popup__head-text'],
    null,
    POPUP_ERRORS.headPopUp
  );
  const cross = creatorTags('button', ['popup__head-cross']);
  const confirmBtn = creatorTags(
    'button',
    ['popup__submit'],
    null,
    POPUP_ERRORS.btnPopUp
  );
  let description;
  switch (error) {
    case 'Unknown currency code': {
      description = creatorTags(
        'p',
        ['popup__description'],
        null,
        POPUP_ERRORS.unknownCode
      );
      break;
    }
    case 'Invalid amount': {
      description = creatorTags(
        'p',
        ['popup__description'],
        null,
        POPUP_ERRORS.invalidAmount
      );
      break;
    }
    case 'Not enough currency': {
      description = creatorTags(
        'p',
        ['popup__description'],
        null,
        POPUP_ERRORS.enoughCurrency
      );
      break;
    }
    case 'Overdraft prevented': {
      description = creatorTags(
        'p',
        ['popup__description'],
        null,
        POPUP_ERRORS.overdraftPrevented
      );
      break;
    }
    case 'Invalid account to': {
      description = creatorTags(
        'p',
        ['popup__description'],
        null,
        POPUP_ERRORS.invalidTo
      );
      break;
    }
    case 'Invalid account from': {
      description = creatorTags(
        'p',
        ['popup__description'],
        null,
        POPUP_ERRORS.invalidFrom
      );
      break;
    }
    case 'No such user': {
      description = creatorTags(
        'p',
        ['popup__description'],
        null,
        POPUP_ERRORS.noSuchUser
      );
      break;
    }
    case 'Invalid password': {
      description = creatorTags(
        'p',
        ['popup__description'],
        null,
        POPUP_ERRORS.invalidPass
      );
      break;
    }
    default: {
      description = creatorTags(
        'p',
        ['popup__description'],
        null,
        POPUP_ERRORS.default
      );
      break;
    }
  }

  headPopUp.append(heading, cross);
  container.append(headPopUp, description, confirmBtn);
  return { container, confirmBtn, cross };
}
