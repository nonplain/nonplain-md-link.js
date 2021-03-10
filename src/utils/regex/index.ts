import { regex as npRegex } from 'nonplain';

const links = {
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

const regex = {
  ...npRegex,
  links,
};

export default regex;
