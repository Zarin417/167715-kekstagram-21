'use strict';

const onError = (message) => {
  const node = document.createElement(`div`);
  node.classList.add(`error-message`);
  node.textContent = message;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const onSuccess = (data) => {
  window.gallery.renderPictures(data);
  window.gallery.setListenersOnLoadPictures(data);
  window.galleryFilters.setActionsOnFilters(data);
};

window.backend.loadData(onSuccess, onError);
