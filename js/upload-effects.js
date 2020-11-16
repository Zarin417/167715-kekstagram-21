'use strict';

const MAX_EFFECT_PERCENTAGE = 100;
const BLUR_MAX_AMOUNT_VALUE = 4;
const BRIGHTNESS_MIN_VALUE = 1;
const BRIGHTNESS_MAX_VALUE = 3;
const PIN_DEFAULT_POSITION = 0;
const EffectType = {
  CHROME: `effects__preview--chrome`,
  SEPIA: `effects__preview--sepia`,
  MARVIN: `effects__preview--marvin`,
  PHOBOS: `effects__preview--phobos`,
  HEAT: `effects__preview--heat`
};
const imgUploadForm = document.querySelector(`#upload-select-image`);
const imgUploadPreview = imgUploadForm.querySelector(`.img-upload__preview`);
const imgUploadPreviewImage = imgUploadPreview.querySelector(`img`);
const effectLevel = imgUploadForm.querySelector(`.effect-level`);
const levelValue = effectLevel.querySelector(`.effect-level__value`);
const levelLine = effectLevel.querySelector(`.effect-level__line`);
const effectLevelPin = levelLine.querySelector(`.effect-level__pin`);
const levelDepth = levelLine.querySelector(`.effect-level__depth`);

// Listener for image filter icons
const effectListChangeHandler = (evt) => {
  if (evt.target.matches(`input[type="radio"]`)) {
    imgUploadPreviewImage.removeAttribute(`class`);
    levelValue.setAttribute(`value`, `0`);
    effectLevelPin.style.left = `${PIN_DEFAULT_POSITION}`;
    levelDepth.style.width = `${PIN_DEFAULT_POSITION}`;
    imgUploadPreviewImage.style.filter = `none`;
    if (evt.target.attributes[4].value === `none`) {
      effectLevel.classList.add(`hidden`);
    } else {
      effectLevel.classList.remove(`hidden`);
      imgUploadPreviewImage.classList.add(`effects__preview--${evt.target.attributes[4].value}`);
    }
  }
};

const setEffectLevel = () => {
  const imgClass = imgUploadPreviewImage.getAttribute(`class`);
  const effectValue = levelValue.getAttribute(`value`);

  switch (imgClass) {
    case EffectType.CHROME:
      imgUploadPreviewImage.style.filter = `grayscale(${effectValue}%)`;
      break;

    case EffectType.SEPIA:
      imgUploadPreviewImage.style.filter = `sepia(${effectValue}%)`;
      break;

    case EffectType.MARVIN:
      imgUploadPreviewImage.style.filter = `invert(${effectValue}%)`;
      break;

    case EffectType.PHOBOS:
      imgUploadPreviewImage.style.filter = `blur(${Math.floor(effectValue / MAX_EFFECT_PERCENTAGE * BLUR_MAX_AMOUNT_VALUE)}px)`;
      break;

    case EffectType.HEAT:
      imgUploadPreviewImage.style.filter = `brightness(
        ${(effectValue < (MAX_EFFECT_PERCENTAGE / BRIGHTNESS_MAX_VALUE)) ? BRIGHTNESS_MIN_VALUE : Math.ceil(effectValue / MAX_EFFECT_PERCENTAGE * BRIGHTNESS_MAX_VALUE)}
        )`;
      break;
  }
};

// Listener for effect level pin
const effectLevelPinMouseDownHandler = (evt) => {
  const PIN_MAX_POSITION = parseInt(levelLine.offsetWidth, 10);
  let startX = evt.clientX;

  const documentMouseMoveHandler = (moveEvt) => {
    moveEvt.preventDefault();
    let shiftX = startX - moveEvt.clientX;
    let newPosition = effectLevelPin.offsetLeft - shiftX;

    startX = moveEvt.clientX;

    if (newPosition < PIN_DEFAULT_POSITION) {
      newPosition = PIN_DEFAULT_POSITION;
    } else if (newPosition > PIN_MAX_POSITION) {
      newPosition = PIN_MAX_POSITION;
    }

    effectLevelPin.style.left = `${newPosition}px`;
    levelDepth.style.width = `${newPosition}px`;
    levelValue.setAttribute(`value`, `${Math.round((newPosition / PIN_MAX_POSITION) * MAX_EFFECT_PERCENTAGE)}`);
    setEffectLevel();
  };

  const documentMouseupHandler = (downEvt) => {
    downEvt.preventDefault();
    document.removeEventListener(`mousemove`, documentMouseMoveHandler);
    document.removeEventListener(`mouseup`, documentMouseupHandler);
  };

  document.addEventListener(`mousemove`, documentMouseMoveHandler);
  document.addEventListener(`mouseup`, documentMouseupHandler);
};

window.uploadEffects = {
  effectListChangeHandler,
  effectLevelPinMouseDownHandler
};
