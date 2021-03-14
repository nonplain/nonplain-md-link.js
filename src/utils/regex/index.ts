import { regex as npRegex } from 'nonplain';

export const links = {
  all: /(\[[^\[\]]*\]\([^\(\)]*\)|\[\[[^\[\]]*\]\])/g,
  markdown: {
    whole: /\[[^\[\]]*\]\([^\(\)]*\)/g,
    innerText: /(?<=\[)[^\[\]]+?(?=\]\([^\(\)]*\))/g,
    path: /(?<=\[[^\[\]]*\]\()[^\(\)]+?(?=\))/g,
  },
  wiki: {
    whole: /\[\[[^\[\]]*\]\]/g,
    innerText: /(?<=\[\[)[^\[\]]+?(?=\]\])/g,
  },
};

export const regex = {
  ...npRegex,
  links,
};
