'use strict';

(() => {
  const COMMENT_INSERTION_POSITION = 2;
  const bigPictureContainer = document.querySelector(`.big-picture`);
  const commentsBlock = bigPictureContainer.querySelector(`.social__comments`);
  const bigPictureImg = bigPictureContainer.querySelector(`.big-picture__img img`);
  const likesAmount = bigPictureContainer.querySelector(`.likes-count`);
  const commentsAmount = bigPictureContainer.querySelector(`.comments-count`);
  const imageCaption = bigPictureContainer.querySelector(`.social__caption`);

  // Create and insert comments list for picture
  const getCommentsList = (picturesData, pictureIndex) => {
    const commentItemTemplate = commentsBlock.querySelector(`.social__comment`);
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < picturesData[pictureIndex].comments.length; i++) {
      const commentItem = commentItemTemplate.cloneNode(true);
      commentItem.querySelector(`.social__picture`).src = picturesData[pictureIndex].comments[i].avatar;
      commentItem.querySelector(`.social__picture`).alt = picturesData[pictureIndex].comments[i].name;
      commentItem.querySelector(`.social__text`).textContent = picturesData[pictureIndex].comments[i].message;
      fragment.appendChild(commentItem);
    }

    commentsBlock.appendChild(fragment);
  };

  // Create and show preview
  const showBigPicture = (pictureData, pictureIndex) => {
    bigPictureImg.src = pictureData.getAttribute(`src`);
    bigPictureImg.alt = pictureData.getAttribute(`alt`);
    likesAmount.textContent = pictureData.nextElementSibling.lastElementChild.textContent;
    commentsAmount.textContent = pictureData.nextElementSibling.firstElementChild.textContent;
    imageCaption.textContent = pictureData.getAttribute(`alt`);
    window.backend.load(getCommentsList, window.util.showError, pictureIndex);
  };

  // Remove comments after preview closed
  const removeCommentsListAppendedChild = () => {
    const socialComment = commentsBlock.querySelectorAll(`.social__comment`);
    for (let i = COMMENT_INSERTION_POSITION; i < socialComment.length; i++) {
      commentsBlock.removeChild(socialComment[i]);
    }
  };

  window.preview = {
    show: showBigPicture,
    removeComments: removeCommentsListAppendedChild
  };
})();

