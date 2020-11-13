'use strict';

(() => {
  const pictures = document.querySelector(`.pictures`);
  const imgUploadField = pictures.querySelector(`#upload-file`);
  const bigPictureContainer = document.querySelector(`.big-picture`);
  const commentCount = bigPictureContainer.querySelector(`.social__comment-count`);
  const commentsLoader = bigPictureContainer.querySelector(`.comments-loader`);
  const imagesFilters = document.querySelector(`.img-filters`);

  // Временно отключены по заданию
  commentCount.classList.add(`hidden`);
  commentsLoader.classList.add(`hidden`);

  window.backend.load(window.picture.createGallery, window.backendMessages.showGetRequestError);
  imagesFilters.classList.remove(`img-filters--inactive`);
  imagesFilters.addEventListener(`click`, window.util.debounce(window.galleryFilters.clickHandler), true);
  pictures.addEventListener(`click`, window.gallery.clickHandler, true);
  pictures.addEventListener(`keydown`, window.gallery.enterPressHandler, true);
  imgUploadField.addEventListener(`change`, window.uploadOverlay.changeHandler);
})();
