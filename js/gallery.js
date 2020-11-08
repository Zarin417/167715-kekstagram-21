'use strict';

(() => {
  const bigPictureContainer = document.querySelector(`.big-picture`);
  const bigPictureClose = bigPictureContainer.querySelector(`.big-picture__cancel`);

  // Add listener for open and close big picture
  const openBigPicture = (targetValue) => {
    document.body.classList.add(`modal-open`);
    window.preview.show(window.util.photosData[targetValue.match(/\d+/) - 1]);
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
        const targetValue = evt.target.childNodes[1].attributes[1].value;
        openBigPicture(targetValue);
      }
    }
  };

  const pictureClickHandler = (evt) => {
    if (evt.target.classList.contains(`picture__img`)) {
      const targetValue = evt.target.attributes[1].value;
      openBigPicture(targetValue);
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

