'use strict';

(() => {
  const bigPictureContainer = document.querySelector(`.big-picture`);
  const bigPictureClose = bigPictureContainer.querySelector(`.big-picture__cancel`);

  const getEventTargetIndex = (target) => {
    const targetIndex = target.attributes[1].value.match(/\d+/) - 1;
    return targetIndex;
  };

  // Add listener for open and close big picture
  const openBigPicture = (pictureTarget, pictureIndex) => {
    document.body.classList.add(`modal-open`);
    window.preview.show(pictureTarget, pictureIndex);
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

  const pictureEnterPressHandler = (evt) => {
    if (evt.key === `Enter`) {
      if (evt.target.classList.contains(`picture`)) {
        evt.preventDefault();
        const pictureData = evt.target.childNodes[1];
        const targetIndex = getEventTargetIndex(pictureData);
        openBigPicture(pictureData, targetIndex);
      }
    }
  };

  const pictureClickHandler = (evt) => {
    if (evt.target.classList.contains(`picture__img`)) {
      const pictureData = evt.target;
      const targetIndex = getEventTargetIndex(pictureData);
      openBigPicture(pictureData, targetIndex);
    }
  };

  const bigPictureCloseHandler = () => {
    closeBigPicture();
  };

  window.gallery = {
    clickHandler: pictureClickHandler,
    enterPressHandler: pictureEnterPressHandler
  };
})();

