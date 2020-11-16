'use strict';

const TYPE_MESSAGE_ERROR = `error`;
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

  if (messageType === TYPE_MESSAGE_ERROR) {
    errorTitle.textContent = `${errorText}`;
  }

  messageCloseBtn = message.querySelector(`button`);
  fragment.appendChild(message);
  pageMain.appendChild(fragment);
  document.addEventListener(`click`, documentClickHandler, true);
  document.addEventListener(`keydown`, documentKeyDownHandler, true);
  messageCloseBtn.addEventListener(`click`, messageCloseBtnClickHandler, true);
};

const closeMessage = () => {
  pageMain.querySelector(`.${messageType}`).remove();
  messageCloseBtn.removeEventListener(`click`, messageCloseBtnClickHandler, true);
  document.removeEventListener(`click`, documentClickHandler, true);
  document.removeEventListener(`keydown`, documentKeyDownHandler, true);
  messageType = null;
  messageCloseBtn = null;
};

// Event listener on click outside window
const documentClickHandler = (evt) => {
  if (evt.target.className === messageType) {
    closeMessage();
  }
};

// Event listener on click close button
const messageCloseBtnClickHandler = () => {
  closeMessage();
};

// Event listener on Escape press
const documentKeyDownHandler = (evt) => {
  if (evt.key === window.util.KeyboardKeyName.ESCAPE) {
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
  showSuccessMessage,
  showErrorMessage
};
