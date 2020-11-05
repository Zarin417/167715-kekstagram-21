'use strict';

(() => {
  const MAX_EFFECT_PERCENTAGE = 100;
  const BLUR_MAX_AMOUNT_VALUE = 4;
  const BRIGHTNESS_MAX_AMOUNT_VALUE = 3;
  const imgUploadForm = document.querySelector(`#upload-select-image`);
  const imgUploadPreview = imgUploadForm.querySelector(`.img-upload__preview`);
  const imgUploadPreviewImage = imgUploadPreview.querySelector(`img`);
  const effectLevel = imgUploadForm.querySelector(`.effect-level`);
  const effectLevelValue = effectLevel.querySelector(`.effect-level__value`);
  const effectLevelLine = effectLevel.querySelector(`.effect-level__line`);
  const effectLevelPin = effectLevelLine.querySelector(`.effect-level__pin`);

  // Listener for image filter icons
  const effectListHandler = (evt) => {
    if (evt.target.matches(`input[type="radio"]`)) {
      imgUploadPreviewImage.removeAttribute(`class`);
      effectLevelValue.setAttribute(`value`, `0`);
      imgUploadPreviewImage.style.filter = `none`;
      if (evt.target.attributes[4].value === `none`) {
        effectLevel.classList.add(`hidden`);
      } else {
        effectLevel.classList.remove(`hidden`);
        imgUploadPreviewImage.classList.add(`effects__preview--${evt.target.attributes[4].value}`);
      }
    }
  };

  const effectLevelPinMouseupHandler = () => {
    const imgClass = imgUploadPreviewImage.getAttribute(`class`);
    const levelLineSize = window.getComputedStyle(effectLevelLine).getPropertyValue(`width`);
    const pinPosition = window.getComputedStyle(effectLevelPin).getPropertyValue(`left`);
    const leftPosition = Math.round((parseInt(pinPosition, 10) / parseInt(levelLineSize, 10)) * MAX_EFFECT_PERCENTAGE);

    switch (imgClass) {
      case `effects__preview--chrome`:
        imgUploadPreviewImage.style.filter = `grayscale(${leftPosition}%)`;
        break;

      case `effects__preview--sepia`:
        imgUploadPreviewImage.style.filter = `sepia(${leftPosition}%)`;
        break;

      case `effects__preview--marvin`:
        imgUploadPreviewImage.style.filter = `invert(${leftPosition}%)`;
        break;

      case `effects__preview--phobos`:
        imgUploadPreviewImage.style.filter = `blur(${Math.floor(leftPosition / MAX_EFFECT_PERCENTAGE * BLUR_MAX_AMOUNT_VALUE)}px)`;
        break;

      case `effects__preview--heat`:
        imgUploadPreviewImage.style.filter = `brightness(${Math.ceil(leftPosition / MAX_EFFECT_PERCENTAGE * BRIGHTNESS_MAX_AMOUNT_VALUE)})`;
        break;
    }
  };

  window.uploadEffect = {
    setItemClickHandler: effectListHandler,
    setPinMouseUpHandler: effectLevelPinMouseupHandler
  };
})();
