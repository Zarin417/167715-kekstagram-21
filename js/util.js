'use strict';
(() => {
  // Variable for storing data received from the server
  let responsePhotosData = null;

  // Get a random number in a given range
  const getRandomInteger = (min, max) => {
    const randomInteger = min + Math.random() * (max + 1 - min);
    return Math.floor(randomInteger);
  };

  // Show error message
  const showErrorMessage = (errorMessage) => {
    const node = document.createElement(`div`);
    node.classList.add(`error-message`);
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.util = {
    getRandomInt: getRandomInteger,
    showError: showErrorMessage,
    photosData: responsePhotosData
  };
})();
