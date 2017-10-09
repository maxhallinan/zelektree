import m from './..';

describe(`test suite name`, () => {
  test(`test`, () => {
    expect(() => m(0)).toThrow(TypeError);
  })
});