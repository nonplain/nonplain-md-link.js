/* eslint-disable */

/* @ts-ignore */
import fs from 'fs';
/* @ts-ignore */
import os from 'os';
/* @ts-ignore */
import path, { ParsedPath } from 'path';
import { Files, FileData } from 'nonplain';

import { Link } from '../dist';

import {
  testFile1Links as expectedTestFile1Links,
  testFile2Links as expectedTestFile2Links,
  testFile3Links as expectedTestFile3Links,
} from './fixtures/files/expected';
import {
  mdLinks,
  wikiLinks,
} from './fixtures/links/src';
import {
  mdLinks as expectedMdLinks,
  wikiLinks as expectedWikiLinks,
} from './fixtures/links/expected';

describe('Link', () => {
  test('parses markdown links on initialization', () => {
    const links = mdLinks.map((link) => new Link(link));
    expect(links).toEqual(expectedMdLinks);
    expect(links[0]).toBeInstanceOf(Link);
  });

  test('parses wiki-style links on initialization', () => {
    const links = wikiLinks.map((link) => new Link(link));
    expect(links).toEqual(expectedWikiLinks);
    expect(links[0]).toBeInstanceOf(Link);
  });

  describe('collectAllLinksFromContent', () => {
    test('extracts all links from markdown body and returns an array of Link instances', async () => {
      const glob = path.join(__dirname, './fixtures/files/src/**/*.md');
      const files = await new Files().load(glob);

      const allFileLinks = files.map(({ body }: FileData) => Link.collectAllLinksFromContent(body));
      const expectedAllFileLinks = [
        expectedTestFile1Links,
        expectedTestFile2Links,
        expectedTestFile3Links,
      ];
      expect(allFileLinks).toEqual(expectedAllFileLinks);
      expect(allFileLinks[0][0]).toBeInstanceOf(Link);
    });
  });

  describe('detectLinkStyle', () => {
    test('detects the style of a link', () => {
      const markdownLinkStyles = mdLinks.map((link) => Link.detectLinkStyle(link));
      const expectedMarkdownLinkStyles = new Array(mdLinks.length).fill('markdown');
      expect(markdownLinkStyles).toEqual(expectedMarkdownLinkStyles);

      const wikiLinkStyles = wikiLinks.map((link) => Link.detectLinkStyle(link));
      const expectedWikiLinkStyles = new Array(wikiLinks.length).fill('wiki');
      expect(wikiLinkStyles).toEqual(expectedWikiLinkStyles);
    });

    test('returns null on invalid link', () => {
      const result = Link.detectLinkStyle('not a link');
      expect(result).toEqual(null);
    });
  });

  describe('composeHTML', () => {
    const link = new Link(mdLinks[0]);

    test('composes an HTML-style link string from a Link instance', () => {
      const htmlLink = link.composeHTML();
      const expected = `<a href="${link.path}">${link.innerText}</a>`;
      expect(htmlLink).toEqual(expected);
    });

    test('composes an HTML-style link string with attributes from a Link instance', () => {
      const attributesStr = 'target="_blank" rel="noreferrer"';
      const htmlLink = link.composeHTML(attributesStr);
      const expected = `<a href="${link.path}" ${attributesStr}>${link.innerText}</a>`;
      expect(htmlLink).toEqual(expected);
    });
  });

  describe('composeMarkdown', () => {
    test('composes a markdown-style link string from a Link instance', () => {
      const link = new Link(mdLinks[0]);
      const markdownLink = link.composeMarkdown();
      const expected = `[${link.innerText}](${link.path})`;
      expect(markdownLink).toEqual(expected);
    });
  });

  describe('composeWiki', () => {
    test('composes a wiki-style link string from a Link instance', () => {
      const link = new Link(mdLinks[0]);
      const wikiLink = link.composeWiki();
      const expected = `[[${link.path}]]`;
      expect(wikiLink).toEqual(expected);
    });
  });
});
