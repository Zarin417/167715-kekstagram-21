'use strict';
(() => {
  const RANDOM_PHOTOS_AMOUNT = 10;
  const pictures = document.querySelector(`.pictures`);
  const galleryFilters = document.querySelector(`.img-filters`);
  const defaultFilter = galleryFilters.querySelector(`#filter-default`);
  const randomFilter = galleryFilters.querySelector(`#filter-random`);
  const discussedFilter = galleryFilters.querySelector(`#filter-discussed`);

  // Clear gallery
  const clearGallery = () => {
    const picturesElements = pictures.querySelectorAll(`.picture`);
    picturesElements.forEach((element) => {
      element.remove();
    });
  };

  // Remove class name when filters change
  const removeFiltersClassName = () => {
    const galleryFiltersElements = galleryFilters.querySelectorAll(`button`);
    galleryFiltersElements.forEach((element) => {
      element.classList.remove(`img-filters__button--active`);
    });
  };

  // Render random shuffle photos
  const renderRandomPhotos = (array) => {
    const randomPhotosArray = [];

    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    for (let i = 0; i < RANDOM_PHOTOS_AMOUNT; i++) {
      randomPhotosArray.push(array[i]);
    }

    window.picture.createGallery(randomPhotosArray);
  };


  // Gallery rendering if selected discussed filter
  const renderDiscussedPhotos = (array) => {
    array.sort((a, b) => {
      return b.comments.length - a.comments.length;
    });

    window.picture.createGallery(array);
  };

  // Event handler on filter change
  const galleryFiltersClickHandler = (evt) => {
    if (evt.target.className.indexOf(`img-filters__button--active`) === -1 && evt.target.nodeName === `BUTTON`) {
      removeFiltersClassName();
      evt.target.classList.add(`img-filters__button--active`);
      clearGallery();

      switch (evt.target) {
        case defaultFilter:
          window.backend.load(window.picture.createGallery, window.backendMessages.showGetRequestError);
          break;
        case randomFilter:
          window.backend.load(renderRandomPhotos, window.backendMessages.showGetRequestError);
          break;
        case discussedFilter:
          window.backend.load(renderDiscussedPhotos, window.backendMessages.showGetRequestError);
          break;
      }
    }
  };

  window.galleryFilters = {
    clickHandler: galleryFiltersClickHandler
  };
})();

