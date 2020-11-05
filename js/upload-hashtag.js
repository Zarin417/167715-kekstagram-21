'use strict';

(() => {
  const HASHTAG_MAX_LENGTH = 20;
  const HASHTAGS_MAX_AMOUNT = 5;
  const HASH_TAG_REGEXP = /^#[\wа-яё]{1,19}$/;
  const imgUploadForm = document.querySelector(`#upload-select-image`);
  const hashtagInput = imgUploadForm.querySelector(`.text__hashtags`);

  // Hashtags validation listener
  const checkHashtagsDuplicate = (hashtag, hashtagIndex, hashtagsArray) => {
    let isMatched = false;

    if (hashtagsArray.indexOf(hashtag, hashtagIndex + 1) !== -1) {
      isMatched = true;
    }

    return isMatched;
  };

  const reportErrorMessage = (text) => {
    hashtagInput.setCustomValidity(text);
    hashtagInput.classList.add(`invalid__text`);
    imgUploadForm.reportValidity();
  };

  const hashtagInputValidationHandler = () => {
    const hashtagsArr = hashtagInput.value.toLowerCase().trim().split(` `);
    hashtagInput.classList.remove(`invalid__text`);
    hashtagInput.setCustomValidity(``);

    if (hashtagInput.value !== ``) {
      for (let hashtag of hashtagsArr) {
        if (hashtag[0] !== `#`) {
          reportErrorMessage(`Хэштег должен начинаться с символа #`);
          break;
        } else if (hashtag === `#`) {
          reportErrorMessage(`Хэштег не может состоять только из символа #`);
          break;
        } else if (hashtag.length > HASHTAG_MAX_LENGTH) {
          reportErrorMessage(`Хэштег не может быть длиннее 20 символов`);
          break;
        } else if (!HASH_TAG_REGEXP.test(hashtag)) {
          reportErrorMessage(`Хэштег не может содержать символы, пробелы и эмодзи`);
          break;
        } else if (hashtagsArr.some(checkHashtagsDuplicate)) {
          reportErrorMessage(`Хэштеги не должны повторяться`);
          break;
        } else if (hashtagsArr.length > HASHTAGS_MAX_AMOUNT) {
          reportErrorMessage(`Хэштегов не может быть больше 5`);
          break;
        }
      }
    }
  };

  window.uploadHashtag = {
    setHashtagHandler: hashtagInputValidationHandler
  };
})();
