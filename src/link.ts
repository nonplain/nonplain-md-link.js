import regex from './utils/regex';

import { LinkStyle } from './types';

export default class Link {
  initialStyle: LinkStyle;

  style: LinkStyle;

  path: string;

  innerText: string;

  constructor(content: string) {
    this.initialStyle = Link.detectLinkStyle(content);
    this.style = this.initialStyle;

    if (!content) {
      throw new Error('Error: content not provided.');
    }

    switch (this.style) {
      case 'wiki':
        [this.path] = content.match(regex.links.wiki.innerText);
        [this.innerText] = content.match(regex.links.wiki.innerText);
        break;
      case 'markdown':
      default:
        [this.path] = content.match(regex.links.markdown.path);
        [this.innerText] = content.match(regex.links.markdown.innerText);
        break;
    }
  }

  static collectAllLinksFromContent(content: string): Link[] {
    const matches = content.match(regex.links.all) || [];
    return matches.map((link) => new Link(link));
  }

  static detectLinkStyle(content: string): LinkStyle {
    let style = null;

    if (regex.links.wiki.whole.test(content)) {
      regex.links.wiki.whole.lastIndex = 0;
      style = 'wiki';
    } else if (regex.links.markdown.whole.test(content)) {
      regex.links.markdown.whole.lastIndex = 0;
      style = 'markdown';
    }

    /* @ts-ignore */
    return style;
  }

  composeHTML(attributesStr?: string): string {
    const attributes = attributesStr ? ` ${attributesStr}` : '';
    return `<a href="${this.path}"${attributes}>${this.innerText}</a>`;
  }

  composeMarkdown(): string {
    return `[${this.innerText}](${this.path})`;
  }

  composeWiki(): string {
    return `[[${this.path}]]`;
  }
}
