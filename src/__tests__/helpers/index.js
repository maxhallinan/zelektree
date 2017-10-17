import { combineReducers, } from 'redux';
import { createSelector, } from 'reselect';
import { toPairs, } from './../../util';

export const actionTypes = {
  TOGGLE_FOO: `TOGGLE_FOO`,
  TOGGLE_BAR: `TOGGLE_BAR`,
};

export const actions = {
  toggleFoo: () => ({ type: actionTypes.TOGGLE_FOO,  }),
  toggleBar: () => ({ type: actionTypes.TOGGLE_BAR,  }),
};

const fooReducer = (state = true, action) => {
  if (action.type === actionTypes.TOGGLE_FOO) {
    return !state;
  }

  return state;
};

const barReducer = (state = false, action) => {
  if (action.type === actionTypes.TOGGLE_BAR) {
    return !state;
  }

  return state;
};

export const reducer = combineReducers({
  foo: fooReducer,
  bar: barReducer,
});

const $isBar = (state) => !!state.bar;
const $isFoo = (state) => !!state.foo;
const and = (x, y) => x && y;
const or = (x, y) => x || y;
const $isFooAndBar = createSelector($isBar, $isFoo, and);
const $isFooOrBar = createSelector($isBar, $isFoo, or);

export const selectors = {
  isBar: $isBar,
  isFoo: $isFoo,
  isFooAndBar: $isFooAndBar,
  isFooOrBar: $isFooOrBar,
};

export const selectorPairs = toPairs(selectors);
