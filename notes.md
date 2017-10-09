# Implementation notes

Embed selectors in a Redux state tree.

## Goals

- Support existing selector implementations, e.g. `reselect`.
- Preserve familiar `combineReducers` API.
- Preserve all Redux state tree behavior, e.g. time travel debugging.
- Lazily evaluation of embedded selectors.
  - Selectors are not called until the state tree property is accessed.
- Serializable for interoperability with redux devtools.


## Implementation

- Use `get` fields for lazy evaluation.

## Questions

- Should I pass the `action` as the second argument, since `reselect` takes a
  second `props` argument?

## API designs

```javascript
import {
  combineReducers,
  createSelector,
  embedSelector,
  SELECTOR_FIELD,
} from 'zelektree';

// `combineReducers` is a wrapper around the redux `combineReducers` with some
// added intelligence about handling selectors.
const reducer = combineReducers({
  // how to distinguish the selector from reducer fields?

  // creates a selector from a Selector class
  // combine reducers checks for type of Selector to find the selectors
  todos: createSelector(/* ... */),

  // some kind of field name convention
  // looks for field names that start with the selector field
  // problem here is that the field name becomes hard to read
  // don't really like the aesthetics of this. feels like it's forcing an
  // implementation detail onto the user.
  [`${SELECTOR_FIELD}/visibleTodos`]: getVisibleTodos,

  // helper function that makes it easier to use the field name convention
  [selectorField('visibleTodos')]: $visibleTodos,

  // preserve natural field name
  // fairly readable
  // would return something like an object { type: 'SELECTOR', selector, }
  visibleTodos: embedSelector($visibleTodos),
});


// this is too verbose and obscures the nice readability of the reducers tree
// structure
const reducer = combineReducers({
  /* ... reducers */
}, {
  /* ... selectors */
})
```

```javascript
import { combineReducers, embedSelector, } from 'zelektree';
import todos from './reducers/todos';
import visibilityFilter from './reducers/visibility-filter';
import $visibleTodos from './selectors/visible-todos';

const reducer = combineReducers({
  todos,
  visibilityFilter,
  visibleTodos: embedSelector($visibleTodos)
});
```
