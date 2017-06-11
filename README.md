# pocky

[![NPM version](https://img.shields.io/npm/v/pocky.svg?style=flat)](https://npmjs.com/package/pocky) [![NPM downloads](https://img.shields.io/npm/dm/pocky.svg?style=flat)](https://npmjs.com/package/pocky) [![CircleCI](https://circleci.com/gh/egoist/pocky/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/pocky/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

## Install

```bash
yarn global add pocky
# OR 
npm i -g pocky
```

## How to use

Populate an entry file for your node app, eg. `index.js`:

```js
const app = require('express')()

app.get('/', (req, res) => 
  res.send('hello world')
)

app.listen(4000, () => 
  console.log('> Open http://localhost:4000')
)
```

Then run `pocky` and you can see:

![preview](https://ooo.0o0.ooo/2017/06/11/593d6137af8e2.png)

To build your app, run `pocky build` instead.

### Babel

By default it uses [babel-preset-pocky](./packages/babel-preset-pocky) which targets your system node version.

### Custom config

#### Entry file

```bash
pocky [path/to/entry.js]
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**pocky** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/pocky/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@egoist](https://github.com/egoist) · Twitter [@rem_rin_rin](https://twitter.com/rem_rin_rin)
