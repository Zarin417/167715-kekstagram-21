'use strict';

(() => {
  const COMMENT_INSERTION_POSITION = 2;
  const bigPictureContainer = document.querySelector(`.big-picture`);
  const commentsBlock = bigPictureContainer.querySelector(`.social__comments`);

  // Create and insert comments list for picture
  const getCommentsList = (pictureComments) => {
    const commentItemTemplate = commentsBlock.querySelector(`.social__comment`);
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < pictureComments.comments.length; i++) {
      const commentItem = commentItemTemplate.cloneNode(true);
      commentItem.querySelector(`.social__picture`).src = pictureComments.comments[i].avatar;
      commentItem.querySelector(`.social__picture`).alt = pictureComments.comments[i].name;
      commentItem.querySelector(`.social__text`).textContent = pictureComments.comments[i].message;
      fragment.appendChild(commentItem);
    }

    commentsBlock.appendChild(fragment);
  };

  // Create and show preview
  const showBigPicture = (pictureInfo) => {
    const bigPictureImg = bigPictureContainer.querySelector(`.big-picture__img img`);
    const likesAmount = bigPictureContainer.querySelector(`.likes-count`);
    const commentsAmount = bigPictureContainer.querySelector(`.comments-count`);
    const imageCaption = bigPictureContainer.querySelector(`.social__caption`);
    bigPictureImg.src = pictureInfo.url;
    bigPictureImg.alt = pictureInfo.description;
    likesAmount.textContent = pictureInfo.likes.toString();
    commentsAmount.textContent = pictureInfo.comments.length.toString();
    imageCaption.textContent = pictureInfo.description;
    getCommentsList(pictureInfo);
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

