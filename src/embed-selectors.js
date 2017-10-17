import getDerivedState from './get-derived-state';
import { toPairs, typeOf, } from './util';

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

      return {
        ...store,
        getState: () => {
          const state = store.getState();

          return {
            ...state,
            ...getDerivedState(selectorPairs, state),
          };
        },
      };
    };
  };
};

export default embedSelectors;
