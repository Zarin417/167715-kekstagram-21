'use strict';
(() => {
  // Get a random number in a given range
  const getRandomInteger = (min, max) => {
    const randomInteger = min + Math.random() * (max + 1 - min);
    return Math.floor(randomInteger);
  };

  window.util = {
    getRandomInt: getRandomInteger
  };
})();
