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
  const getCommentsList = (commentsData) => {
    const commentItemTemplate = commentsBlock.querySelector(`.social__comment`);
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < commentsData.length; i++) {
      const commentItem = commentItemTemplate.cloneNode(true);
      commentItem.querySelector(`.social__picture`).src = commentsData[i].avatar;
      commentItem.querySelector(`.social__picture`).alt = commentsData[i].name;
      commentItem.querySelector(`.social__text`).textContent = commentsData[i].message;
      fragment.appendChild(commentItem);
    }

    commentsBlock.appendChild(fragment);
  };

  // Create and show preview
  const showBigPicture = (pictureData) => {
    bigPictureImg.src = pictureData.url;
    bigPictureImg.alt = pictureData.description;
    likesAmount.textContent = `${pictureData.likes}`;
    commentsAmount.textContent = `${pictureData.comments.length}`;
    imageCaption.textContent = pictureData.description;
    getCommentsList(pictureData.comments);
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

