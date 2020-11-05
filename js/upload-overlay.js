'use strict';

(() => {
  const MAX_IMG_SCALE = 100;
  const imgUploadForm = document.querySelector(`#upload-select-image`);
  const imgUploadField = imgUploadForm.querySelector(`#upload-file`);
  const imgUploadOverlay = imgUploadForm.querySelector(`.img-upload__overlay`);
  const imgUploadCancel = imgUploadOverlay.querySelector(`#upload-cancel`);
  const imgUploadDescription = imgUploadOverlay.querySelector(`.text__description`);
  const hashtagInput = imgUploadOverlay.querySelector(`.text__hashtags`);
  const effectsList = imgUploadForm.querySelector(`.effects__list`);
  const filterDefault = effectsList.querySelector(`#effect-none`);
  const imgUploadPreview = imgUploadOverlay.querySelector(`.img-upload__preview`);
  const imgUploadPreviewImage = imgUploadPreview.querySelector(`img`);
  const imgSizeScale = imgUploadOverlay.querySelector(`.scale`);
  const imgSizeScaleValue = imgSizeScale.querySelector(`.scale__control--value`);
  const effectLevel = imgUploadOverlay.querySelector(`.effect-level`);
  const effectLevelLine = effectLevel.querySelector(`.effect-level__line`);
  const effectLevelPin = effectLevelLine.querySelector(`.effect-level__pin`);

  // Listener on submit
  const imgUploadFormHandler = (evt) => {
    if (hashtagInput.validity.customError) {
      evt.preventDefault();
    }
  };

  // Add listeners for image upload overlay
  const imgUploadOverlayClose = () => {
    imgUploadField.value = ``;
    imgUploadOverlay.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    imgSizeScaleValue.value = `${MAX_IMG_SCALE}%`;
    imgUploadPreview.style.transform = `none`;
    imgUploadPreviewImage.style.filter = `none`;
    imgUploadPreviewImage.removeAttribute(`class`);
    filterDefault.checked = `true`;
  };

  const imgUploadOverlayEscPressHandler = (evt) => {
    if (evt.key === `Escape` && document.activeElement !== hashtagInput && document.activeElement !== imgUploadDescription) {
      evt.preventDefault();
      imgUploadOverlayClose();
    }
  };

  const imgUploadOverlayCloseHandler = () => {
    imgUploadOverlayClose();
    document.removeEventListener(`keydown`, imgUploadOverlayEscPressHandler);
    imgSizeScale.removeEventListener(`click`, window.uploadSize.setClickHandler);
    effectsList.removeEventListener(`change`, window.uploadEffect.setItemClickHandler);
    effectLevelPin.removeEventListener(`mouseup`, window.uploadEffect.setPinMouseUpHandler);
    hashtagInput.removeEventListener(`input`, window.uploadHashtag.setHashtagHandler);
    imgUploadForm.removeEventListener(`submit`, imgUploadFormHandler);
    imgUploadCancel.removeEventListener(`click`, imgUploadOverlayCloseHandler);
  };

  const imgUploadOverlayOpenHandler = () => {
    imgUploadOverlay.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
    effectLevel.classList.add(`hidden`);
    document.addEventListener(`keydown`, imgUploadOverlayEscPressHandler);
    imgUploadCancel.addEventListener(`click`, imgUploadOverlayCloseHandler);
    imgSizeScale.addEventListener(`click`, window.uploadSize.setClickHandler);
    effectsList.addEventListener(`change`, window.uploadEffect.setItemClickHandler, true);
    effectLevelPin.addEventListener(`mouseup`, window.uploadEffect.setPinMouseUpHandler);
    hashtagInput.addEventListener(`input`, window.uploadHashtag.setHashtagHandler);
    imgUploadForm.addEventListener(`submit`, imgUploadFormHandler);
  };

  window.uploadOverlay = {
    changeHandler: imgUploadOverlayOpenHandler
  };
})();
