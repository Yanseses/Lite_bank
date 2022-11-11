import { creatorTags } from '../creatorTags.js';
import { HEADINGS } from '../constants.js';

export function createSection(page) {
  document.title = HEADINGS[page];
  const section = creatorTags('section', [page]);
  const headPage = creatorTags('div', [`${page}__head`]);
  const heading = creatorTags('h1', [`${page}__heading`], null, HEADINGS[page]);
  headPage.append(heading);
  section.append(headPage);

  return { section, headPage };
}
