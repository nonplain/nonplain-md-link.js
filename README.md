# nonplain-md-link

Tools for markdown links in [nonplain files](https://github.com/jaredgorski/nonplain.js#what-a-nonplain-file-is).

## What this library does

Markdown files often contain markdown-style links, which look like this:

```
[link inner text](/path/to/some/file/or/site)
```

They can also sometimes contain wiki-style links when used for notetaking. Wiki-style links look like this:

```
[[/path/to/some/file/or/site]]
```

The concept: provide a tool for gathering and working with markdown and wiki-style links within [nonplain](https://github.com/jaredgorski/nonplain.js) files.

Once these links are gathered, they can be analyzed and selectively edited to accomplish various goals such as:

- converting links to HTML
- re-basing links to work on your personal website
- listing all forward links in a file
- calculating backlinks for a file

...and more.

## API

### Initialization

To parse a link, pass it as a string to the `Link` class upon initialization:

```js
const { Link } = require("nonplain-md-link");

const markdownLink = new Link('[my markdown link](/path/to/file.md)');
const wikiLink = new Link('[[/path/to/file.md]]');

console.log(markdownLink);

// Output:
//
// {
//   "initialStyle": "markdown",
//   "innerText": "my markdown link",
//   "path": "/path/to/file.md",
//   "style": "markdown",
// }

console.log(wikiLink);

// Output:
//
// {
//   "initialStyle": "wiki",
//   "innerText": "/path/to/file.md",
//   "path": "/path/to/file.md",
//   "style": "wiki",
// }
```

Once a link is parsed, its contents can be used to construct new links.

### Link.collectAllLinksFromContent()

Returns `Link` instances for all markdown and wiki-style links within a given string.

### Link.detectLinkStyle()

Returns the link style (`'markdown'` or `'wiki'`) of a provided string.

```js
const markdownLink = new Link('[my markdown link](/path/to/file.md)');
const wikiLink = new Link('[[/path/to/file.md]]');

console.log(Link.detectLinkStyle(markdownLink));

// Output:
//
// 'markdown'

console.log(Link.detectLinkStyle(markdownLink));

// Output:
//
// 'wiki'
```

### Link.prototype.composeHTML()

```js
link.composeHTML([attributesStr])
```

Returns an HTML string based on the current `Link` instance. The optional argument `attributesStr` inserts custom attributes after the `href` attribute.

```js
const link = new Link('[my markdown link](/path/to/file.md)');

console.log(link.composeHTML());

// Output:
//
// '<a href="/path/to/file.md">my markdown link</a>'

const externalLinkAttributes = 'target="_blank" rel="noreferrer"';
console.log(link.composeHTML(externalLinkAttributes));

// Output:
//
// '<a href="/path/to/file.md" target="_blank" rel="noreferrer">my markdown link</a>'
```

### Link.prototype.composeMarkdown()

```js
link.composeMarkdown([attributesStr])
```

Returns a markdown link based on the current `Link` instance.

```js
const link = new Link('[my markdown link](/path/to/file.md)');

console.log(link.composeMarkdown());

// Output:
//
// '[my markdown link](/path/to/file.md)'
```

### Link.prototype.composeWiki()

```js
link.composeWiki([attributesStr])
```

Returns a wiki-style link based on the current `Link` instance.

```js
const link = new Link('[my markdown link](/path/to/file.md)');

console.log(link.composeWiki());

// Output:
//
// '[[/path/to/file.md]]'
```

## Regex

This library exports an object containing useful [regex patterns for parsing nonplain files](https://github.com/jaredgorski/nonplain.js/blob/master/src/utils/regex/index.ts) as well as [extracting markdown and wiki-style links](https://github.com/jaredgorski/nonplain-md-link.js/blob/master/src/utils/regex/index.ts) from string content. To use these patterns, import `regex` from this package:

```js
const { regex } = require("nonplain-md-link");
```

## Related work

- Core nonplain library for JS: [nonplain.js](https://github.com/jaredgorski/nonplain.js)

## Contributing

These tools are in progress. If your use-case requires specific functionality from this library, please contact me and we'll see what we can do together. Thanks!
