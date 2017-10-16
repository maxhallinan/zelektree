import { embedSelectors, } from './..';
import { typeOf, } from './../util';

describe(`zelektree`, () => {
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
});
