'use strict';
(() => {
  const DEBOUNCE_INTERVAL = 500;

  // Get a random number in a given range
  const getRandomInteger = (min, max) => {
    const randomInteger = min + Math.random() * (max + 1 - min);
    return Math.floor(randomInteger);
  };

  // Debounce
  const setDebounce = (cb) => {
    let lastTimeout = null;

    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };


  window.util = {
    getRandomInt: getRandomInteger,
    debounce: setDebounce
  };
})();
