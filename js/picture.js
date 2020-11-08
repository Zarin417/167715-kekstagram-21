'use strict';

(() => {
  const pictures = document.querySelector(`.pictures`);

  // Create picture as DOM-element based on template
  const createPicture = (pictureItem) => {
    const pictureTemplate = document.querySelector(`#picture`)
      .content
      .querySelector(`.picture`);
    const pictureElement = pictureTemplate.cloneNode(true);
    const commentsLength = pictureItem.comments.length;
    pictureElement.querySelector(`.picture__img`).src = pictureItem.url;
    pictureElement.querySelector(`.picture__img`).alt = pictureItem.description;
    pictureElement.querySelector(`.picture__likes`).textContent = pictureItem.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = commentsLength.toString();
    return pictureElement;
  };

  // Rendering of created pictures elements
  const renderingPictures = (picturesData) => {
    const picturesBlock = pictures;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < picturesData.length; i++) {
      fragment.appendChild(createPicture(picturesData[i]));
    }

    picturesBlock.appendChild(fragment);
  };

  window.picture = {
    createGallery: renderingPictures
  };
})();
