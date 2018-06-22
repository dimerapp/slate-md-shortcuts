# Slate md shortcuts
> Markdown shortcuts for slate.js

[![travis-image]][travis-url]
[![npm-image]][npm-url]

This repo will insert markdown syntax for certain inline decorations like **bold**, **emphasis**, **strike**, **image** ,**url** and **inlineCode**.

## Installation
Install it from npm.

```shell
npm i slate-md-shortcuts

# yarn
yarn add slate-md-shortcuts
```

## Usage
This is not a standard Slate.js plugin, but instead a generic module you can use inside the keydown handler.

```js
import shortcuts from 'slate-md-shortcuts'

class App extends React.Component {
  onKeyDown = (event, change) => {
    const handled = shortcuts.handle(event, change)

    if (!handled) {
      // key was not a markdown shortcut
    }
  }

  render() {
    return <Editor
        value={ this.state.value }
        onChange={ this.onChange }
        onKeyDown={ this.onKeyDown }
      />
  }
}
```

## Shortcuts
This only adds shortcuts for inline decorations and not for blocks.

| Shortcut | Expanded to |
|---------|---------|
| `Cmd + b` | Bold |
| `Cmd + i` | Emphasis |
| `Cmd + k` | Url |
| `Cmd + Shift + K` | Image |
| `Cmd + /` | Inline code |
| `Cmd + Shift + E` | Strike |

## Contributing
Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](CONTRIBUTING.md).

## Authors & License
[thetutlage](https://github.com/thetutlage) and [contributors](https://github.com/dimerapp/slate-md-shortcuts/graphs/contributors).

MIT License, see the included [MIT](LICENSE.md) file.

[travis-image]: https://img.shields.io/travis/dimerapp/slate-md-shortcuts/master.svg?style=flat-square&logo=travis
[travis-url]: https://travis-ci.org/dimerapp/slate-md-shortcuts "travis"

[npm-image]: https://img.shields.io/npm/v/slate-md-shortcuts.svg?style=flat-square&logo=npm
[npm-url]: https://npmjs.org/package/slate-md-shortcuts "npm"
