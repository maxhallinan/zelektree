import { combineReducers, createStore, } from 'redux';
import { embedSelectors, } from './..';
import getDerivedState from './../get-derived-state';
import { toPairs, typeOf, } from './../util';

const fooReducer = () => true;

const barReducer = () => false;

const reducer = combineReducers({
  foo: fooReducer,
  bar: barReducer,
});

const $isBar = (state) => !!state.bar;
const $isFoo = (state) => !!state.foo;
const $isFooAndBar = (state) => state.foo && state.bar;
const $isFooOrBar = (state) => state.foo || state.bar;

const selectors = {
  isBar: $isBar,
  isFoo: $isFoo,
  isFooAndBar: $isFooAndBar,
  isFooOrBar: $isFooOrBar,
};

const selectorPairs = toPairs(selectors);

describe(`zelektree > embedSelectors`, () => {
  test(`Throws a TypeError if \`embedSelectors\` is called without an object.`, () => {
    const invalid = [
      function () {},
      [], [ 1, ],
      ``, `foo`,
      0, 1,
      false, true,
      null,
      undefined,
    ];

    const errMsg = (x) => (
      `Expected \`selectors\` to be an object. ` +
      `\`selectors\` is type ${typeOf(x)} instead.`
    );

    invalid.forEach((x) => {
      expect(() => embedSelectors(x)).toThrow(TypeError);
      expect(() => embedSelectors(x)).toThrow(errMsg(x));
    });
  });

  test(`Returns a StoreEhancer`, () => {
    const storeEnhancer = embedSelectors(selectors);

    expect(storeEnhancer).toHaveLength(1);

    const storeCreator = storeEnhancer(createStore);

    expect(storeCreator).toHaveLength(2);

    const store = storeCreator(reducer);
    const storeKeys = Object.keys(store);

    expect(storeKeys).toHaveLength(4);

    const expectedKeys = [
      `dispatch`,
      `getState`,
      `replaceReducer`,
      `subscribe`,
    ];

    expectedKeys.forEach((key) => {
      expect(store.hasOwnProperty(key)).toBeTruthy();
    });
  });
});

describe(`zelektree > getDerivedState`, () => {
  test(`Takes an object map of selectors and a state object.`, () => {
    expect(getDerivedState).toHaveLength(2);
  });

  test(`Returns an object composed of the selector keys and the selector outputs.`, () => {
    const state1 = { foo: false, bar: true, };
    const expectedDerivedState1 = {
      isFoo: false,
      isBar: true,
      isFooAndBar: false,
      isFooOrBar: true,
    };
    const derivedState1 = getDerivedState(selectorPairs, state1);

    expect(derivedState1).toEqual(expectedDerivedState1);

    const state2 = { foo: true, bar: false, };
    const expectedDerivedState2 = {
      isFoo: true,
      isBar: false,
      isFooAndBar: false,
      isFooOrBar: true,
    };
    const derivedState2 = getDerivedState(selectorPairs, state2);

    expect(derivedState2).toEqual(expectedDerivedState2);

    const state3 = { foo: true, bar: true, };
    const expectedDerivedState3 = {
      isFoo: true,
      isBar: true,
      isFooAndBar: true,
      isFooOrBar: true,
    };
    const derivedState3 = getDerivedState(selectorPairs, state3);

    expect(derivedState3).toEqual(expectedDerivedState3);

    const state4 = { foo: false, bar: false, };
    const expectedDerivedState4 = {
      isFoo: false,
      isBar: false,
      isFooAndBar: false,
      isFooOrBar: false,
    };
    const derivedState4 = getDerivedState(selectorPairs, state4);

    expect(derivedState4).toEqual(expectedDerivedState4);
  });
});
