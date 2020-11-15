'use strict';

(() => {
  const pictures = document.querySelector(`.pictures`);
  const imgUploadField = pictures.querySelector(`#upload-file`);

  const onError = (message) => {
    const node = document.createElement(`div`);
    node.classList.add(`error-message`);
    node.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const onSuccess = (data) => {
    window.gallery.createContent(data);
    window.gallery.setListeners(data);
    window.galleryFilters.setActions(data);
  };

  window.backend.load(onSuccess, onError);

  imgUploadField.addEventListener(`change`, window.uploadOverlay.changeHandler);
})();
