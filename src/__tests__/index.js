import { combineReducers, createStore, } from 'redux';
import { embedSelectors, } from './..';
import { typeOf, } from './../util';

const fooReducer = () => true;

const barReducer = () => false;

const reducer = combineReducers({
  foo: fooReducer,
  bar: barReducer,
});

const $isFooAndBar = (state) => state.foo && state.bar;

const selectors = {
  isFooAndBar: $isFooAndBar,
};

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
