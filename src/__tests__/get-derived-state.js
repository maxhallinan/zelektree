import { selectorPairs, } from './helpers';
import getDerivedState from './../get-derived-state';

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
