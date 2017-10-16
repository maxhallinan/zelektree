import { typeOf, } from './util';

const embedSelectors = (selectors) => {
  if (typeOf(selectors) !== `object`) {
    throw new TypeError(
      `Expected \`selectors\` to be an object. ` +
      `\`selectors\` is type ${typeOf(selectors)} instead.`
    );
  }
};

export default embedSelectors;
