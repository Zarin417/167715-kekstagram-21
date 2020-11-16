'use strict';

const MAX_IMG_SCALE = 100;
const imgUploadForm = document.querySelector(`#upload-select-image`);
const imgUploadField = imgUploadForm.querySelector(`#upload-file`);
const imgUploadOverlay = imgUploadForm.querySelector(`.img-upload__overlay`);
const imgUploadCancel = imgUploadOverlay.querySelector(`#upload-cancel`);
const imgUploadDescription = imgUploadOverlay.querySelector(`.text__description`);
const hashtagField = imgUploadOverlay.querySelector(`.text__hashtags`);
const effectsList = imgUploadForm.querySelector(`.effects__list`);
const filterDefault = effectsList.querySelector(`#effect-none`);
const imgUploadPreview = imgUploadOverlay.querySelector(`.img-upload__preview`);
const imgUploadPreviewImage = imgUploadPreview.querySelector(`img`);
const imgSizeScale = imgUploadOverlay.querySelector(`.scale`);
const imgSizeScaleValue = imgSizeScale.querySelector(`.scale__control--value`);
const effectLevel = imgUploadOverlay.querySelector(`.effect-level`);
const effectLevelLine = effectLevel.querySelector(`.effect-level__line`);
const effectLevelPin = effectLevelLine.querySelector(`.effect-level__pin`);

// Add listeners for image upload overlay
const imgUploadOverlayOpen = () => {
  imgUploadOverlay.classList.remove(`hidden`);
  document.body.classList.add(`modal-open`);
  effectLevel.classList.add(`hidden`);
  document.addEventListener(`keydown`, documentEscPressHandler);
  imgUploadCancel.addEventListener(`click`, imgUploadCancelClickHandler);
  imgSizeScale.addEventListener(`click`, window.uploadSize.imgSizeScaleClickHandler);
  effectsList.addEventListener(`change`, window.uploadEffects.effectListChangeHandler, true);
  effectLevelPin.addEventListener(`mousedown`, window.uploadEffects.effectLevelPinMouseDownHandler);
  hashtagField.addEventListener(`input`, window.validateHashtag.hashtagFieldInputHandler);
  imgUploadForm.addEventListener(`submit`, imgUploadFormSubmitHandler);
};

const imgUploadOverlayClose = () => {
  imgUploadField.value = ``;
  imgUploadForm.reset();
  imgUploadOverlay.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);
  imgSizeScaleValue.value = `${MAX_IMG_SCALE}%`;
  imgUploadPreview.style.transform = `none`;
  imgUploadPreviewImage.style.filter = `none`;
  imgUploadPreviewImage.removeAttribute(`class`);
  filterDefault.checked = `true`;
  hashtagField.classList.remove(`invalid__text`);
  document.removeEventListener(`keydown`, documentEscPressHandler);
  imgSizeScale.removeEventListener(`click`, window.uploadSize.imgSizeScaleClickHandler);
  effectsList.removeEventListener(`change`, window.uploadEffects.effectListChangeHandler, true);
  effectLevelPin.removeEventListener(`mousedown`, window.uploadEffects.effectLevelPinMouseDownHandler);
  hashtagField.removeEventListener(`input`, window.validateHashtag.hashtagFieldInputHandler);
  imgUploadForm.removeEventListener(`submit`, imgUploadFormSubmitHandler);
  imgUploadCancel.removeEventListener(`click`, imgUploadCancelClickHandler);
};

const documentEscPressHandler = (evt) => {
  if (evt.key === window.util.KeyboardKeyName.ESCAPE && document.activeElement !== hashtagField && document.activeElement !== imgUploadDescription) {
    evt.preventDefault();
    imgUploadOverlayClose();
  }
};

const imgUploadCancelClickHandler = () => {
  imgUploadOverlayClose();
};

const imgUploadFieldChangeHandler = () => {
  imgUploadOverlayOpen();
};

// Listener on submit
const imgUploadFormSubmitHandler = (evt) => {
  evt.preventDefault();
  window.backend.saveData(window.backendMessages.showSuccessMessage, window.backendMessages.showErrorMessage, new FormData(imgUploadForm));
  imgUploadOverlayClose();
};

imgUploadField.addEventListener(`change`, imgUploadFieldChangeHandler);
