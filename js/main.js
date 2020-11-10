'use strict';

(() => {
  const pictures = document.querySelector(`.pictures`);
  const imgUploadField = pictures.querySelector(`#upload-file`);
  const bigPictureContainer = document.querySelector(`.big-picture`);
  const commentCount = bigPictureContainer.querySelector(`.social__comment-count`);
  const commentsLoader = bigPictureContainer.querySelector(`.comments-loader`);

  // Временно отключены по заданию
  commentCount.classList.add(`hidden`);
  commentsLoader.classList.add(`hidden`);

  window.backend.load(window.picture.createGallery, window.util.showError);
  pictures.addEventListener(`click`, window.gallery.clickHandler, true);
  pictures.addEventListener(`keydown`, window.gallery.enterPressHandler, true);
  imgUploadField.addEventListener(`change`, window.uploadOverlay.changeHandler);
})();
