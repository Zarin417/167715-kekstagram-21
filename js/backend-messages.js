'use strict';
(() => {
  const pageMain = document.querySelector(`main`);
  let messageType = null;
  let messageCloseBtn = null;
  let messageWindow = null;

  // Create and insert new fragment on page
  const showResponseMessage = (template) => {
    const message = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    messageType = message.className;
    messageCloseBtn = message.querySelector(`button`);
    fragment.appendChild(message);
    pageMain.appendChild(fragment);
    messageWindow = pageMain.querySelector(`.${messageType}`);
    document.addEventListener(`click`, messageClickHandler, true);
    document.addEventListener(`keydown`, messageEscapePressHandler, true);
    messageCloseBtn.addEventListener(`click`, closeBtnClickHandler, true);
  };

  const closeMessage = () => {
    document.removeEventListener(`click`, messageClickHandler, true);
    document.removeEventListener(`keydown`, messageEscapePressHandler, true);
    messageCloseBtn.removeEventListener(`click`, closeBtnClickHandler, true);
    pageMain.removeChild(messageWindow);
    messageType = null;
    messageCloseBtn = null;
    messageWindow = null;
  };

  // Event listener on click outside window
  const messageClickHandler = (evt) => {
    if (evt.target.className === messageType) {
      closeMessage();
    }
  };

  // Event listener on click close button
  const closeBtnClickHandler = () => {
    closeMessage();
  };

  // Event listener on Escape press
  const messageEscapePressHandler = (evt) => {
    if (evt.key === `Escape` && pageMain.contains(messageWindow)) {
      evt.preventDefault();
      closeMessage();
    }
  };

  // Show error message on GET request
  const showGetRequestErrorMessage = (errorMessage) => {
    const node = document.createElement(`div`);
    node.classList.add(`error-message`);
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backendMessages = {
    showGetRequestError: showGetRequestErrorMessage,
    showMessage: showResponseMessage
  };
})();
