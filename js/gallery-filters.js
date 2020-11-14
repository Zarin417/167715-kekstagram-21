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
  const renderDefaultPhotos = window.util.debounce((data) => {
    window.gallery.createGallery(data);
  });

  // Render random shuffle photos
  const renderRandomPhotos = window.util.debounce((data) => {
    const photos = Array.from(data);
    const randomPhotos = [];

    for (let i = photos.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [photos[i], photos[j]] = [photos[j], photos[i]];
    }

    for (let i = 0; i < RANDOM_PHOTOS_AMOUNT; i++) {
      randomPhotos.push(photos[i]);
    }

    window.gallery.createGallery(randomPhotos);
  });


  // Gallery rendering if selected discussed filter
  const renderDiscussedPhotos = window.util.debounce((data) => {
    const photos = Array.from(data);

    photos.sort((a, b) => {
      return b.comments.length - a.comments.length;
    });

    window.gallery.createGallery(photos);
  });

  // Filters action
  const filtersActions = (eventTarget, data) => {
    switch (eventTarget) {
      case defaultFilter:
        renderDefaultPhotos(data);
        break;
      case randomFilter:
        renderRandomPhotos(data);
        break;
      case discussedFilter:
        renderDiscussedPhotos(data);
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
      if (evt.key === `Enter`) {
        filtersActionHandler(evt, data);
      }
    }, true);
  };

  window.galleryFilters = {
    setActions: setActionsOnFilters
  };
})();

