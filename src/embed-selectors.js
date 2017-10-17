import { toPairs, typeOf, } from './util';
import getDerivedState from './get-derived-state';

const embedSelectors = (selectors) => {
  if (typeOf(selectors) !== `object`) {
    throw new TypeError(
      `Expected \`selectors\` to be an object. ` +
      `\`selectors\` is type ${typeOf(selectors)} instead.`
    );
  }

  const selectorPairs = toPairs(selectors);

  return (next) => {
    return (reducer, preloadedState) => {
      const store = next(reducer, preloadedState);
      const state = store.getState();

      return {
        ...store,
        getState: () => ({
          ...state,
          ...getDerivedState(selectorPairs, state),
        }),
      };
    };
  };
};

export default embedSelectors;
