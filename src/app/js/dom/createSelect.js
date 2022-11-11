import { creatorTags } from '../creatorTags.js';

export function createSelect(selectObj, selected = '') {
  const selectList = creatorTags('ul', ['select-list', 'select-list--hide']);

  for (const key in selectObj) {
    const selectItem = creatorTags(
      'li',
      ['select-list__item'],
      { id: key },
      selectObj[key]
    );
    if (selected !== '' && selected == key) {
      selectItem.classList.add('select-list__item--select');
    }
    selectList.append(selectItem);
  }

  return selectList;
}
