'use strict';
export default (str) => {
  if (typeof str !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof str}`);
  }

  return str;
};