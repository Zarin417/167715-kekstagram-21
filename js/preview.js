'use strict';

const COMMENTS_STEP = 5;
const bigPictureContainer = document.querySelector(`.big-picture`);
const commentsBlock = bigPictureContainer.querySelector(`.social__comments`);
const commentItemTemplate = commentsBlock.querySelector(`.social__comment`);
const bigPictureImg = bigPictureContainer.querySelector(`.big-picture__img img`);
const likesAmount = bigPictureContainer.querySelector(`.likes-count`);
const imageCaption = bigPictureContainer.querySelector(`.social__caption`);
const photoCommentsCount = bigPictureContainer.querySelector(`.social__comment-count`);
const commentsCount = photoCommentsCount.querySelector(`.comments-count`);
const commentsLoader = bigPictureContainer.querySelector(`.comments-loader`);

// Create and insert comments list for picture
const renderCommentsList = (commentsData) => {
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < commentsData.length; i++) {
    const commentItem = commentItemTemplate.cloneNode(true);
    const {avatar, message, name} = commentsData[i];
    commentItem.querySelector(`.social__picture`).src = avatar;
    commentItem.querySelector(`.social__picture`).alt = name;
    commentItem.querySelector(`.social__text`).textContent = message;
    fragment.appendChild(commentItem);
  }

  commentsBlock.appendChild(fragment);
};

// Remove comments after preview closed
const removeCommentsList = () => {
  const socialComments = commentsBlock.querySelectorAll(`.social__comment`);
  for (let i = 0; i < socialComments.length; i++) {
    commentsBlock.removeChild(socialComments[i]);
  }
};

// Create and show preview
const showBigPicture = (pictureData) => {
  const {url, likes, description} = pictureData;
  let {comments: commentsData} = pictureData;
  let commentsStartIndex = 0;
  let commentsAmount = 0;

  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesAmount.textContent = `${likes}`;
  commentsCount.textContent = `${commentsData.length}`;
  imageCaption.textContent = description;
  removeCommentsList();

  const commentsLoadClickHandler = () => {
    if (commentsData.length <= COMMENTS_STEP) {
      commentsAmount += commentsData.length;
      photoCommentsCount.firstChild.textContent = `${commentsAmount} из `;
      commentsLoader.classList.add(`hidden`);
      renderCommentsList(commentsData);
      commentsLoader.removeEventListener(`click`, commentsLoadClickHandler);
    } else {
      commentsAmount += COMMENTS_STEP;
      photoCommentsCount.firstChild.textContent = `${commentsAmount} из `;
      renderCommentsList(commentsData.slice(commentsStartIndex, COMMENTS_STEP));
      commentsLoader.classList.remove(`hidden`);
      commentsData = commentsData.slice(COMMENTS_STEP);
    }
  };

  commentsLoadClickHandler();
  commentsLoader.addEventListener(`click`, commentsLoadClickHandler);
};

window.preview = {
  showBigPicture
};
