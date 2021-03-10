import Link from '../../link';
import regex from '../regex';

export const collectAllLinksFromContent = (content: string): Link[] =>
  (content.match(regex.links.all) || []).map((link) => new Link(link));
