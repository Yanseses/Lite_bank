import { creatorTags } from '../creatorTags.js';
import { NAVINGATION } from '../constants.js';

export function createHeader(logo) {
  const header = creatorTags('header', ['header']);
  const container = creatorTags('div', ['header__container']);
  const logoIcon = creatorTags('img', ['header__logo'], { src: logo });

  container.append(logoIcon);
  header.append(container);

  return { header, container };
}

export function createNav() {
  const navigation = creatorTags('nav', ['navigation']);
  const burgerBtn = creatorTags('button', ['navigation__burger'], {
    type: 'button',
    'aria-label': 'Меню свернуто',
    'aria-expanded': 'false',
  });
  const burgerLine = creatorTags('span', ['navigation__burger-line']);
  const navList = creatorTags('ul', ['navgigation__list', 'nav-list']);

  for (const elem in NAVINGATION) {
    const navItem = creatorTags(
      'li',
      NAVINGATION[elem].id == 'card'
        ? ['nav-list__item', 'nav-list__item--active']
        : ['nav-list__item'],
      { id: NAVINGATION[elem].id },
      NAVINGATION[elem].name
    );
    navList.append(navItem);
  }

  burgerBtn.append(burgerLine);

  burgerBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let expanded = burgerBtn.getAttribute('aria-expanded');
    let label = burgerBtn.getAttribute('aria-label');

    burgerBtn.classList.toggle('navigation__burger--active');
    navList.classList.toggle('nav-list--active');
    if (navList.classList.contains('nav-list--active')) {
      expanded = true;
      label = 'Меню развернуто';
      document.body.classList.add('no-scroll');
    } else {
      expanded = false;
      label = 'Меню свернуто';
      document.body.classList.remove('no-scroll');
    }
    burgerBtn.setAttribute('aria-expanded', expanded);
    burgerBtn.setAttribute('aria-label', label);
  });

  navigation.append(burgerBtn, navList);
  return { navigation, navList };
}
