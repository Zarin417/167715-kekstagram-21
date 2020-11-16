'use strict';
(() => {
  const DEBOUNCE_INTERVAL = 500;
  const KeyboardKeyName = {
    ESCAPE: `Escape`,
    ENTER: `Enter`
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
    KeyboardKeyName,
    setDebounce
  };
})();
