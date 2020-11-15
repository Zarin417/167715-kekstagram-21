'use strict';
(() => {
  const pageMain = document.querySelector(`main`);
  const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  let messageType = null;
  let messageCloseBtn = null;

  // Create and insert new fragment on page
  const createMessage = (template, errorText) => {
    const message = template.cloneNode(true);
    const errorTitle = message.querySelector(`.error__title`);
    const fragment = document.createDocumentFragment();

    messageType = message.className;

    if (messageType === `error`) {
      errorTitle.textContent = `${errorText}`;
    }

    messageCloseBtn = message.querySelector(`button`);
    fragment.appendChild(message);
    pageMain.appendChild(fragment);
    document.addEventListener(`click`, messageClickHandler, true);
    document.addEventListener(`keydown`, messageEscapePressHandler, true);
    messageCloseBtn.addEventListener(`click`, closeBtnClickHandler, true);
  };

  const closeMessage = () => {
    pageMain.querySelector(`.${messageType}`).remove();
    messageCloseBtn.removeEventListener(`click`, closeBtnClickHandler, true);
    document.removeEventListener(`click`, messageClickHandler, true);
    document.removeEventListener(`keydown`, messageEscapePressHandler, true);
    messageType = null;
    messageCloseBtn = null;
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
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeMessage();
    }
  };

  const showSuccessMessage = () => {
    createMessage(successMessageTemplate);
  };

  const showErrorMessage = (errorText) => {
    createMessage(errorMessageTemplate, errorText);
  };

  window.backendMessages = {
    showSuccess: showSuccessMessage,
    showError: showErrorMessage
  };
})();
