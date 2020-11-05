'use strict';

(() => {
  const pictures = document.querySelector(`.pictures`);

  // Create picture as DOM-element based on template
  const createPicture = (descriptionItem) => {
    const pictureTemplate = document.querySelector(`#picture`)
      .content
      .querySelector(`.picture`);
    const pictureElement = pictureTemplate.cloneNode(true);
    const commentsLength = descriptionItem.comments.length;
    pictureElement.querySelector(`.picture__img`).src = descriptionItem.url;
    pictureElement.querySelector(`.picture__img`).alt = descriptionItem.description;
    pictureElement.querySelector(`.picture__likes`).textContent = descriptionItem.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = commentsLength.toString();
    return pictureElement;
  };

  // Rendering of created pictures elements
  const renderingPictures = () => {
    const picturesBlock = pictures;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < window.data.photoDescription.length; i++) {
      fragment.appendChild(createPicture(window.data.photoDescription[i]));
    }

    picturesBlock.appendChild(fragment);
  };

  window.picture = {
    createGallery: renderingPictures
  };
})();
