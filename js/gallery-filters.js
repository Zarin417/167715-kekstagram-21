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

  // Render  default photos
  const renderDefaultPhotos = window.util.setDebounce((data) => {
    window.gallery.renderPictures(data);
  });

  // Render random shuffle photos
  const renderRandomPhotos = window.util.setDebounce((data) => {
    const randomPhotos = [];

    for (let i = data.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }

    for (let i = 0; i < RANDOM_PHOTOS_AMOUNT; i++) {
      randomPhotos.push(data[i]);
    }

    window.gallery.renderPictures(randomPhotos);
  });


  // Gallery rendering if selected discussed filter
  const renderDiscussedPhotos = window.util.setDebounce((data) => {
    data.sort((a, b) => {
      return b.comments.length - a.comments.length;
    });

    window.gallery.renderPictures(data);
  });

  // Filters action
  const filtersActions = (eventTarget, data) => {
    const photos = Array.from(data);

    switch (eventTarget) {
      case defaultFilter:
        renderDefaultPhotos(photos);
        break;
      case randomFilter:
        renderRandomPhotos(photos);
        break;
      case discussedFilter:
        renderDiscussedPhotos(photos);
        break;
    }
  };

  // Event handler on filter click
  const filtersActionHandler = (evt, data) => {
    if (!evt.target.className.includes(`img-filters__button--active`) && evt.target.nodeName === `BUTTON`) {
      removeFiltersClassName();
      evt.target.classList.add(`img-filters__button--active`);
      clearGallery();
      filtersActions(evt.target, data);
    }
  };

  const setActionsOnFilters = (data) => {
    galleryFilters.classList.remove(`img-filters--inactive`);

    galleryFilters.addEventListener(`click`, (evt) => {
      filtersActionHandler(evt, data);
    }, true);

    galleryFilters.addEventListener(`keydown`, (evt) => {
      if (evt.key === window.util.KeyboardKeyName.ENTER) {
        filtersActionHandler(evt, data);
      }
    }, true);
  };

  window.galleryFilters = {
    setActionsOnFilters
  };
})();
