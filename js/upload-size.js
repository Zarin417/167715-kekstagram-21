'use strict';

(() => {
  const IMG_SCALE_STEP = 25;
  const MIN_IMG_SCALE = IMG_SCALE_STEP;
  const MAX_IMG_SCALE = 100;
  const imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
  const imgUploadPreview = imgUploadOverlay.querySelector(`.img-upload__preview`);
  const imgSizeScale = imgUploadOverlay.querySelector(`.scale`);
  const imgSizeScaleValue = imgSizeScale.querySelector(`.scale__control--value`);
  const imgSizeScaleSmaller = imgSizeScale.querySelector(`.scale__control--smaller`);
  const imgSizeScaleBigger = imgSizeScale.querySelector(`.scale__control--bigger`);

  // Listener for image size scale
  const getSmallerSize = (scaleValue) => {
    if (scaleValue > MIN_IMG_SCALE) {
      imgSizeScaleValue.value = `${scaleValue - IMG_SCALE_STEP}%`;
      imgUploadPreview.style.transform = `scale(${(scaleValue - IMG_SCALE_STEP) / MAX_IMG_SCALE})`;
    }
  };

  const getBiggerSize = (scaleValue) => {
    if (scaleValue < MAX_IMG_SCALE) {
      imgSizeScaleValue.value = `${scaleValue + IMG_SCALE_STEP}%`;
      imgUploadPreview.style.transform = `scale(${(scaleValue + IMG_SCALE_STEP) / MAX_IMG_SCALE})`;
    }
  };

  const imgSizeScaleHandler = (evt) => {
    const scaleValue = Number(imgSizeScaleValue.value.match(/\d+/));

    if (evt.target === imgSizeScaleSmaller) {
      getSmallerSize(scaleValue);
    } else if (evt.target === imgSizeScaleBigger) {
      getBiggerSize(scaleValue);
    }
  };

  window.uploadSize = {
    setClickHandler: imgSizeScaleHandler
  };
})();
