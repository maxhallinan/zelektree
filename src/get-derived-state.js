const foldSelectorPairs = (state) => (derived, [ key, selector, ]) => ({
  ...derived,
  [key]: selector(state),
});

const getDerivedState = (selectorPairs, state) => {
  const derivedState = selectorPairs.reduce(foldSelectorPairs(state), {});

  return derivedState;
};

export default getDerivedState;
