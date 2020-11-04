'use strict';

const USERS_COMMENTS = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];
const USERS_NAMES = [
  `Паль Ачино`,
  `Доберт Ре Ниро`,
  `Пред Бит`,
  `Рулия Джобертс`,
  `Тарлиз Шерон`,
  `Райнона Вайдер`,
  `Пэри Моппинс`,
  `Чеки Джан`,
  `Дин Визель`
];
const PHOTOS_DESCRIPTIONS = [
  `Пляж возле отеля с рядами шезлонгов`,
  `Указатель направления дороги на пляж`,
  `Залив на экзотическом острове`,
  `Девушка на пляже с фотоаппаратом`,
  `Человечки из риса в тарелочках супа`,
  `Черная спортивная машина`,
  `Клубника на тарелке с вилкой`,
  `Два стакана киселя из клюквы`,
  `Пляжные отдыхающие машут низколетящему самолету`,
  `Открытая обувная полка с обувью`,
  `Огороженная пляжная дорога`,
  `Белый автомобиль Ауди`,
  `Кусочки красной рыбы с порезанными овощами и приправами`,
  `Кот в костюме суши`,
  `Ноги обутые в теплые уги и закинутые на быльце дивана`,
  `Горный хребет под покровом облаков снятый с воздуха`,
  `Хор певцов стоящих в несколько рядов`,
  `Раритетный американский автомобиль в здании из красного кирпича`,
  `Тапочки с подсветкой одетые на ноги в комнате с выключенным освещением`,
  `Вечер, освещенная площадь с двумя рядами пальм в центре`,
  `Тарелка какой-то еды с кусочком лайма и вилкой`,
  `Закат на берегу океана`,
  `Морской краб крупным планом`,
  `Вид сцены с трибун на концерте`,
  `Белый Джип проезжающий через водоем с ревущими бегемотами`
];
const DESCRIPTIONS_AMOUNT = 25;
const AVATARS_AMOUNT = 6;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const IMG_SCALE_STEP = 25;
const MIN_IMG_SCALE = IMG_SCALE_STEP;
const MAX_IMG_SCALE = 100;
const MAX_EFFECT_PERCENTAGE = 100;
const HASHTAG_MAX_LENGTH = 20;
const HASHTAGS_MAX_AMOUNT = 5;
const HASH_TAG_REGEXP = /^#[\wа-яё]{1,19}$/;
const COMMENT_INSERTION_POSITION = 2;
const PERCENTAGE = MAX_IMG_SCALE;
const BLUR_MAX_AMOUNT_VALUE = 4;
const BRIGHTNESS_MAX_AMOUNT_VALUE = 3;
const bigPictureContainer = document.querySelector(`.big-picture`);
const commentsBlock = bigPictureContainer.querySelector(`.social__comments`);
const commentCount = bigPictureContainer.querySelector(`.social__comment-count`);
const commentsLoader = bigPictureContainer.querySelector(`.comments-loader`);
const pictures = document.querySelector(`.pictures`);
const bigPictureClose = bigPictureContainer.querySelector(`.big-picture__cancel`);
const imgUploadForm = pictures.querySelector(`.img-upload__form`);
const imgUploadField = imgUploadForm.querySelector(`#upload-file`);
const imgUploadCancel = imgUploadForm.querySelector(`#upload-cancel`);
const imgUploadOverlay = imgUploadForm.querySelector(`.img-upload__overlay`);
const imgSizeScale = imgUploadForm.querySelector(`.scale`);
const imgSizeScaleSmaller = imgSizeScale.querySelector(`.scale__control--smaller`);
const imgSizeScaleBigger = imgSizeScale.querySelector(`.scale__control--bigger`);
const imgSizeScaleValue = imgSizeScale.querySelector(`.scale__control--value`);
const imgUploadPreview = imgUploadOverlay.querySelector(`.img-upload__preview`);
const imgUploadPreviewImage = imgUploadPreview.querySelector(`img`);
const effectLevel = imgUploadForm.querySelector(`.effect-level`);
const effectsList = imgUploadForm.querySelector(`.effects__list`);
const filterDefault = effectsList.querySelector(`#effect-none`);
const effectLevelValue = effectLevel.querySelector(`.effect-level__value`);
const effectLevelLine = effectLevel.querySelector(`.effect-level__line`);
const effectLevelPin = effectLevelLine.querySelector(`.effect-level__pin`);
const hashtagInput = imgUploadForm.querySelector(`.text__hashtags`);
const imgUploadDescription = imgUploadForm.querySelector(`.text__description`);

// Временно отключены по заданию
commentCount.classList.add(`hidden`);
commentsLoader.classList.add(`hidden`);

// Get a random number in a given range
const getRandomInteger = (min, max) => {
  const randomInteger = min + Math.random() * (max + 1 - min);
  return Math.floor(randomInteger);
};

// Get a random comment from user
const getRandomComment = (comments, names) => {
  const comment = {
    avatar: `img/avatar-${getRandomInteger(1, AVATARS_AMOUNT)}.svg`,
    message: comments[getRandomInteger(0, comments.length - 1)],
    name: names[getRandomInteger(0, names.length - 1)]
  };
  return comment;
};

// Get a random amount comments for one picture
const getRandomAmountComments = (comments, names) => {
  const randomAmountComments = [];

  for (let i = 0; i < getRandomInteger(1, AVATARS_AMOUNT); i++) {
    randomAmountComments.push(getRandomComment(comments, names));
  }
  return randomAmountComments;
};

// Create description for photos
const getPhotoDescriptionArray = (description, comments, names) => {
  let photoDescriptionArray = [];

  for (let i = 0; i < DESCRIPTIONS_AMOUNT; i++) {
    photoDescriptionArray.push({
      url: `photos/${i + 1}.jpg`,
      description: `${description[i]}`,
      likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
      comments: getRandomAmountComments(comments, names)
    });
  }
  return photoDescriptionArray;
};

const photoDescription = getPhotoDescriptionArray(PHOTOS_DESCRIPTIONS, USERS_COMMENTS, USERS_NAMES);

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
const renderPictures = () => {
  const picturesBlock = pictures;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < photoDescription.length; i++) {
    fragment.appendChild(createPicture(photoDescription[i]));
  }
  picturesBlock.appendChild(fragment);
};

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

// Create and show big picture
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

renderPictures();

// Add listener for open and close big picture
const removeCommentsListAppendedChild = () => {
  const socialComment = commentsBlock.querySelectorAll(`.social__comment`);
  for (let i = COMMENT_INSERTION_POSITION; i < socialComment.length; i++) {
    commentsBlock.removeChild(socialComment[i]);
  }
};

const openBigPicture = (targetValue) => {
  showBigPicture(photoDescription[targetValue.match(/\d+/) - 1]);
  bigPictureContainer.classList.remove(`hidden`);
  bigPictureClose.addEventListener(`click`, bigPictureCloseHandler);
  document.addEventListener(`keydown`, bigPictureEscPressHandler);
};

const closeBigPicture = () => {
  removeCommentsListAppendedChild();
  bigPictureContainer.classList.add(`hidden`);
  document.removeEventListener(`keydown`, bigPictureEscPressHandler);
  bigPictureClose.removeEventListener(`click`, bigPictureCloseHandler);
};

const bigPictureEscPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const pictureEnterPressHandler = (evt) => {
  if (evt.key === `Enter`) {
    if (evt.target.classList.contains(`picture`)) {
      evt.preventDefault();
      const targetValue = evt.target.childNodes[1].attributes[1].value;
      openBigPicture(targetValue);
    }
  }
};

const pictureClickHandler = (evt) => {
  if (evt.target.classList.contains(`picture__img`)) {
    const targetValue = evt.target.attributes[1].value;
    openBigPicture(targetValue);
  }
};

const bigPictureCloseHandler = () => {
  closeBigPicture();
};

pictures.addEventListener(`click`, pictureClickHandler, true);
pictures.addEventListener(`keydown`, pictureEnterPressHandler, true);

// Listener for image size scale
const getSmallerSize = (scaleValue) => {
  if (scaleValue > MIN_IMG_SCALE) {
    imgSizeScaleValue.value = `${scaleValue - IMG_SCALE_STEP}%`;
    imgUploadPreview.style.transform = `scale(${(scaleValue - IMG_SCALE_STEP) / MAX_IMG_SCALE})`;
  }
};

const getBiggerSize = (scaleValue) => {
  if (scaleValue < MAX_IMG_SCALE) {
    imgSizeScaleValue.value = `${scaleValue + IMG_SCALE_STEP}%`;
    imgUploadPreview.style.transform = `scale(${(scaleValue + IMG_SCALE_STEP) / MAX_IMG_SCALE})`;
  }
};

const imgSizeScaleHandler = (evt) => {
  const scaleValue = Number(imgSizeScaleValue.value.match(/\d+/));
  if (evt.target === imgSizeScaleSmaller) {
    getSmallerSize(scaleValue);
  } else if (evt.target === imgSizeScaleBigger) {
    getBiggerSize(scaleValue);
  }
};

// Listener for image filter icons
const effectListHandler = (evt) => {
  if (evt.target.matches(`input[type="radio"]`)) {
    imgUploadPreviewImage.removeAttribute(`class`);
    effectLevelValue.setAttribute(`value`, `0`);
    imgUploadPreviewImage.style.filter = `none`;
    if (evt.target.attributes[4].value === `none`) {
      effectLevel.classList.add(`hidden`);
    } else {
      effectLevel.classList.remove(`hidden`);
      imgUploadPreviewImage.classList.add(`effects__preview--${evt.target.attributes[4].value}`);
    }
  }
};

const effectLevelPinMouseupHandler = () => {
  const imgClass = imgUploadPreviewImage.getAttribute(`class`);
  const levelLineSize = window.getComputedStyle(effectLevelLine).getPropertyValue(`width`);
  const pinPosition = window.getComputedStyle(effectLevelPin).getPropertyValue(`left`);
  const leftPosition = Math.round((parseInt(pinPosition, 10) / parseInt(levelLineSize, 10)) * PERCENTAGE);
  switch (imgClass) {
    case `effects__preview--chrome`:
      imgUploadPreviewImage.style.filter = `grayscale(${leftPosition}%)`;
      break;

    case `effects__preview--sepia`:
      imgUploadPreviewImage.style.filter = `sepia(${leftPosition}%)`;
      break;

    case `effects__preview--marvin`:
      imgUploadPreviewImage.style.filter = `invert(${leftPosition}%)`;
      break;

    case `effects__preview--phobos`:
      imgUploadPreviewImage.style.filter = `blur(${Math.floor(leftPosition / MAX_EFFECT_PERCENTAGE * BLUR_MAX_AMOUNT_VALUE)}px)`;
      break;

    case `effects__preview--heat`:
      imgUploadPreviewImage.style.filter = `brightness(${Math.ceil(leftPosition / MAX_EFFECT_PERCENTAGE * BRIGHTNESS_MAX_AMOUNT_VALUE)})`;
      break;
  }
};

// Hashtags validation listener
const checkHashtagsDublicate = (hashtag, hashtagIndex, hashtagsArray) => {
  let matches = false;
  if (hashtagsArray.indexOf(hashtag, hashtagIndex + 1) !== -1) {
    matches = true;
  }
  return matches;
};

const reportErrorMessage = (text) => {
  hashtagInput.setCustomValidity(text);
  hashtagInput.classList.add(`invalid__text`);
  imgUploadForm.reportValidity();
};

const hashtagInputValidationHandler = () => {
  const hashtagsArr = hashtagInput.value.toLowerCase().trim().split(` `);
  hashtagInput.classList.remove(`invalid__text`);
  hashtagInput.setCustomValidity(``);
  if (hashtagInput.value !== ``) {
    for (let hashtag of hashtagsArr) {
      if (hashtag[0] !== `#`) {
        reportErrorMessage(`Хэштег должен начинаться с символа #`);
        break;
      } else if (hashtag === `#`) {
        reportErrorMessage(`Хэштег не может состоять только из символа #`);
        break;
      } else if (hashtag.length > HASHTAG_MAX_LENGTH) {
        reportErrorMessage(`Хэштег не может быть длиннее 20 символов`);
        break;
      } else if (!HASH_TAG_REGEXP.test(hashtag)) {
        reportErrorMessage(`Хэштег не может содержать символы, пробелы и эмодзи`);
        break;
      } else if (hashtagsArr.some(checkHashtagsDublicate)) {
        reportErrorMessage(`Хэштеги не должны повторяться`);
        break;
      } else if (hashtagsArr.length > HASHTAGS_MAX_AMOUNT) {
        reportErrorMessage(`Хэштегов не может быть больше 5`);
        break;
      }
    }
  }
};

// Listener for image upload form on submit
const imgUploadFormHandler = (evt) => {
  if (hashtagInput.validity.customError) {
    evt.preventDefault();
  }
};

// Add listeners for image upload overlay
const imgUploadOverlayClose = () => {
  imgUploadField.value = ``;
  imgUploadOverlay.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);
  imgSizeScaleValue.value = `${MAX_IMG_SCALE}%`;
  imgUploadPreview.style.transform = `none`;
  imgUploadPreviewImage.style.filter = `none`;
  imgUploadPreviewImage.removeAttribute(`class`);
  filterDefault.checked = `true`;
};

const imgUploadOverlayEscPressHandler = (evt) => {
  if (evt.key === `Escape` && document.activeElement !== hashtagInput && document.activeElement !== imgUploadDescription) {
    evt.preventDefault();
    imgUploadOverlayClose();
  }
};

const imgUploadOverlayCloseHandler = () => {
  imgUploadOverlayClose();
  document.removeEventListener(`keydown`, imgUploadOverlayEscPressHandler);
  imgSizeScale.removeEventListener(`click`, imgSizeScaleHandler);
  effectsList.removeEventListener(`change`, effectListHandler);
  effectLevelPin.removeEventListener(`mouseup`, effectLevelPinMouseupHandler);
  hashtagInput.removeEventListener(`input`, hashtagInputValidationHandler);
  imgUploadForm.removeEventListener(`submit`, imgUploadFormHandler);
  imgUploadCancel.removeEventListener(`click`, imgUploadOverlayCloseHandler);
};

const imgUploadOverlayOpenHandler = () => {
  imgUploadOverlay.classList.remove(`hidden`);
  document.body.classList.add(`modal-open`);
  effectLevel.classList.add(`hidden`);
  document.addEventListener(`keydown`, imgUploadOverlayEscPressHandler);
  imgUploadCancel.addEventListener(`click`, imgUploadOverlayCloseHandler);
  imgSizeScale.addEventListener(`click`, imgSizeScaleHandler);
  effectsList.addEventListener(`change`, effectListHandler, true);
  effectLevelPin.addEventListener(`mouseup`, effectLevelPinMouseupHandler);
  hashtagInput.addEventListener(`input`, hashtagInputValidationHandler);
  imgUploadForm.addEventListener(`submit`, imgUploadFormHandler);
};

imgUploadField.addEventListener(`change`, imgUploadOverlayOpenHandler);
