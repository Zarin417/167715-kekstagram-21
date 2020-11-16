'use strict';

const pictures = document.querySelector(`.pictures`);
const bigPictureContainer = document.querySelector(`.big-picture`);
const bigPictureClose = bigPictureContainer.querySelector(`.big-picture__cancel`);

// Create picture as DOM-element based on template
const createPictureByTemplate = (pictureItem) => {
  const pictureTemplate = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);
  const pictureElement = pictureTemplate.cloneNode(true);
  const {url, description, likes, comments} = pictureItem;

  pictureElement.querySelector(`.picture__img`).src = url;
  pictureElement.querySelector(`.picture__img`).alt = description;
  pictureElement.querySelector(`.picture__likes`).textContent = `${likes}`;
  pictureElement.querySelector(`.picture__comments`).textContent = `${comments.length}`;

  return pictureElement;
};

// Rendering of created pictures elements
const renderPictures = (picturesData) => {
  const picturesBlock = pictures;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < picturesData.length; i++) {
    fragment.appendChild(createPictureByTemplate(picturesData[i]));
  }

  picturesBlock.appendChild(fragment);
};

// Get the index of the selected picture
const getEventTargetIndex = (target) => {
  const targetIndex = target.attributes[1].value.match(/\d+/) - 1;
  return targetIndex;
};

// Add listeners for open and close big picture
const openBigPicture = (pictureTarget) => {
  document.body.classList.add(`modal-open`);
  window.preview.showBigPicture(pictureTarget);
  bigPictureContainer.classList.remove(`hidden`);
  bigPictureClose.addEventListener(`click`, bigPictureCloseClickHandler);
  document.addEventListener(`keydown`, documentEscPressHandler);
};

const closeBigPicture = () => {
  document.body.classList.remove(`modal-open`);
  bigPictureContainer.classList.add(`hidden`);
  document.removeEventListener(`keydown`, documentEscPressHandler);
  bigPictureClose.removeEventListener(`click`, bigPictureCloseClickHandler);
};

const documentEscPressHandler = (evt) => {
  if (evt.key === window.util.KeyboardKeyName.ESCAPE) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const pictureEnterPressHandler = (evt, data) => {
  if (evt.key === window.util.KeyboardKeyName.ENTER) {
    if (evt.target.classList.contains(`picture`)) {
      evt.preventDefault();
      const targetIndex = getEventTargetIndex(evt.target.childNodes[1]);
      openBigPicture(data[targetIndex]);
    }
  }
};

const pictureClickHandler = (evt, data) => {
  if (evt.target.classList.contains(`picture__img`)) {
    const targetIndex = getEventTargetIndex(evt.target);
    openBigPicture(data[targetIndex]);
  }
};

const bigPictureCloseClickHandler = () => {
  closeBigPicture();
};

const setListenersOnLoadPictures = (data) => {
  pictures.addEventListener(`click`, (evt) => {
    pictureClickHandler(evt, data);
  }, true);

  pictures.addEventListener(`keydown`, (evt) => {
    pictureEnterPressHandler(evt, data);
  }, true);
};

window.gallery = {
  renderPictures,
  setListenersOnLoadPictures
};
