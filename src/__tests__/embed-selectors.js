import {  createStore, } from 'redux';
import { embedSelectors, } from './..';
import { actions, reducer, selectors, } from './helpers';
import { typeOf, } from './../util';

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

  test(`Merges store state and derived state.`, () => {
    const storeEnhancer = embedSelectors(selectors);
    const store = createStore(reducer, storeEnhancer);
    const state = store.getState();
    const expectedState = {
      foo: true,
      bar: false,
      isFoo: true,
      isBar: false,
      isFooAndBar: false,
      isFooOrBar: true,
    };

    expect(state).toEqual(expectedState);
  });

  test(`Derived state values are keyed by selector key.`, () => {
    const storeEnhancer = embedSelectors(selectors);
    const store = createStore(reducer, storeEnhancer);
    const state = store.getState();
    const stateKeys = Object.keys(state);

    expect(stateKeys).toHaveLength(6);

    const expectedKeys = [
      `foo`,
      `bar`,
      `isFoo`,
      `isBar`,
      `isFooAndBar`,
      `isFooOrBar`,
    ];

    expectedKeys.forEach((key) => {
      expect(state.hasOwnProperty(key)).toBeTruthy();
    });
  });

  test(`Selectors are refreshed by every store.getState call.`, () => {
    const storeEnhancer = embedSelectors(selectors);
    const store = createStore(reducer, storeEnhancer);

    const state1 = store.getState();
    const expectedState1 = {
      foo: true,
      bar: false,
      isFoo: true,
      isBar: false,
      isFooAndBar: false,
      isFooOrBar: true,
    };

    expect(state1).toEqual(expectedState1);

    store.dispatch(actions.toggleFoo());
    const state2 = store.getState();
    const expectedState2 = {
      foo: false,
      bar: false,
      isFoo: false,
      isBar: false,
      isFooAndBar: false,
      isFooOrBar: false,
    };

    expect(state2).toEqual(expectedState2);

    store.dispatch(actions.toggleBar());
    const state3 = store.getState();
    const expectedState3 = {
      foo: false,
      bar: true,
      isFoo: false,
      isBar: true,
      isFooAndBar: false,
      isFooOrBar: true,
    };

    expect(state3).toEqual(expectedState3);
  });
});
