# zelektree
[![Build status](https://travis-ci.org/maxhallinan/zelektree.svg?branch=master)](https://travis-ci.org/maxhallinan/zelektree)
[![Coverage Status](https://coveralls.io/repos/github/maxhallinan/zuhlektion/badge.svg?branch=master)](https://coveralls.io/github/maxhallinan/zuhlektion?branch=master)

Embed [selectors](https://stackoverflow.com/questions/38674200/what-are-selectors-in-redux)
in a Redux state tree.

This is a convenient way for components to share selectors that are used widely
throughout an app.

Inspired by [Baobab](https://github.com/Yomguithereal/baobab#computed-data-or-monkey-business).


## Install

```
$ yarn install zelektree
```


## Usage

```javascript
import { connect, createStore, } from 'redux';
import { embedSelectors, } from 'zelektree';

const initialState = { foo: null, };

const reducer = (state = initialState) => state;

const store = createStore(
  reducer,
  // pass as the `enhancer` argument to `createStore`
  embedSelectors({
    // key each selector by intended state key name
    isFoo: (state) => !!state.foo,
  }),
);

// state and derived state are synced and merged
const state = store.getState(); // { foo: null, isFoo: false, }
```


## API

### embedSelectors(selectors)

Takes an object map of selectors and returns a Redux
[StoreEnhancer](http://redux.js.org/docs/Glossary.html#store-enhancer).

The store enhancer refreshes the selectors each time `getState` is called and
the result is merged with the returned state.

`embedSelectors` expects the top-level state value to be an object. To optimize
performance, this expectation is not enforced with runtime checks.

#### selectors

Type: `{ [String]: (Object) -> * }`

An object map of selectors. The key for each selector is used as the state tree
key for that selector's output. A selector is called with a single argument, `state`.
`state` is the current state of the store.

`embedSelectors` is interoperable with any selector that is soley a reduction of
state and not state and props, for example.


## License

MIT © [Max Hallinan](https://github.com/maxhallinan)
