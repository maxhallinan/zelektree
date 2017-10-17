export const toPairs = (props) =>
  Object
    .keys(props)
    .map((key) => [ key, props[key], ]);

export const typeOf = (x)  =>
  ({}).toString
    .call(x)
    .match(/\s([a-z|A-Z]+)/)[1]
    .toLowerCase();
