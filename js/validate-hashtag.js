'use strict';

(() => {
  const HASHTAG_MAX_LENGTH = 20;
  const HASHTAGS_MAX_AMOUNT = 5;
  const HASH_TAG_REGEXP = /^#[\wа-яё]{1,19}$/;
  const imgUploadForm = document.querySelector(`#upload-select-image`);
  const hashtagField = imgUploadForm.querySelector(`.text__hashtags`);

  // Hashtags validation listener
  const checkHashtagsDuplicate = (hashtag, hashtagIndex, hashtagsArray) => {
    let isMatched = false;

    if (hashtagsArray.indexOf(hashtag, hashtagIndex + 1) !== -1) {
      isMatched = true;
    }

    return isMatched;
  };

  const reportErrorMessage = (text) => {
    hashtagField.setCustomValidity(text);
    hashtagField.classList.add(`invalid__text`);
    imgUploadForm.reportValidity();
  };

  const hashtagFieldInputHandler = () => {
    const hashtagsArr = hashtagField.value.toLowerCase().trim().split(` `);
    hashtagField.classList.remove(`invalid__text`);
    hashtagField.setCustomValidity(``);

    if (hashtagField.value !== ``) {
      hashtagsArr.forEach((element) => {
        if (element[0] !== `#`) {
          return reportErrorMessage(`Хэштег должен начинаться с символа #`);
        } else if (element === `#`) {
          return reportErrorMessage(`Хэштег не может состоять только из символа #`);
        } else if (element.length > HASHTAG_MAX_LENGTH) {
          return reportErrorMessage(`Хэштег не может быть длиннее 20 символов`);
        } else if (!HASH_TAG_REGEXP.test(element)) {
          return reportErrorMessage(`Хэштег не может содержать символы, пробелы и эмодзи`);
        } else if (hashtagsArr.some(checkHashtagsDuplicate)) {
          return reportErrorMessage(`Хэштеги не должны повторяться`);
        } else if (hashtagsArr.length > HASHTAGS_MAX_AMOUNT) {
          return reportErrorMessage(`Хэштегов не может быть больше 5`);
        } else {
          return undefined;
        }
      });
    }
  };

  window.validateHashtag = {
    hashtagFieldInputHandler
  };
})();
