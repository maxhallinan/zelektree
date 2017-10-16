# zelektree
[![Build status](https://travis-ci.org/maxhallinan/zelektree.svg?branch=master)](https://travis-ci.org/maxhallinan/zelektree)
[![Code coverage](https://codecov.io/gh/maxhallinan/zelektree/badge.svg?branch=master)](https://coveralls.io/repos/github/maxhallinan/zelektree/badge.svg?branch=master)

*Work in progress*

Embed selectors in the Redux state tree.

This is intended to be a convenient option for selectors that are used
widely throughout an app.

Inspired by [Baobab](https://github.com/Yomguithereal/baobab#computed-data-or-monkey-business).


## Install

```
$ yarn install zelektree
```


## Usage

```javascript
import { connect, createStore, } from 'redux';
import { embedSelectors, } from 'zelektree';
import $activeFoo from './selectors/active-foo';
import reducer from './reducer';

const store = createStore(
  reducer,
  // pass as the `enhancer` argument to `createStore`
  embedSelectors({
    // key each selector by intended state key name
    activeFoo: $activeFoo,
  }),
);

// ...

// state and derived state are synced and merged
const mapStateToProps = (state) => ({ activeFoo: state.activeFoo, });
```


## API

### embedSelectors(selectors)

Takes an object map of selectors and returns a Redux
[StoreEnhancer](http://redux.js.org/docs/Glossary.html#store-enhancer).

#### selectors

Type: `Object`

An object map of selectors.


## License

MIT © [Max Hallinan](https://github.com/maxhallinan)
