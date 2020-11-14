'use strict';

(() => {
  const pictures = document.querySelector(`.pictures`);
  const bigPictureContainer = document.querySelector(`.big-picture`);
  const bigPictureClose = bigPictureContainer.querySelector(`.big-picture__cancel`);

  // Create picture as DOM-element based on template
  const createPictureByTemplate = (pictureItem) => {
    const pictureTemplate = document.querySelector(`#picture`)
      .content
      .querySelector(`.picture`);
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector(`.picture__img`).src = pictureItem.url;
    pictureElement.querySelector(`.picture__img`).alt = pictureItem.description;
    pictureElement.querySelector(`.picture__likes`).textContent = pictureItem.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = `${pictureItem.comments.length}`;

    return pictureElement;
  };

  // Rendering of created pictures elements
  const renderingPictures = (picturesData) => {
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
    window.preview.show(pictureTarget);
    bigPictureContainer.classList.remove(`hidden`);
    bigPictureClose.addEventListener(`click`, bigPictureCloseHandler);
    document.addEventListener(`keydown`, bigPictureEscPressHandler);
  };

  const closeBigPicture = () => {
    document.body.classList.remove(`modal-open`);
    window.preview.removeComments();
    bigPictureContainer.classList.add(`hidden`);
    document.removeEventListener(`keydown`, bigPictureEscPressHandler);
    bigPictureClose.removeEventListener(`click`, bigPictureCloseHandler);
  };

  const bigPictureEscPressHandler = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  const pictureEnterPressHandler = (evt, data) => {
    if (evt.key === `Enter`) {
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

  const bigPictureCloseHandler = () => {
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
    createGallery: renderingPictures,
    setListeners: setListenersOnLoadPictures
  };
})();
