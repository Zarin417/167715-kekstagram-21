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
const bigPictureContainer = document.querySelector(`.big-picture`);
const commentCount = bigPictureContainer.querySelector(`.social__comment-count`);
const commentsLoader = bigPictureContainer.querySelector(`.comments-loader`);

commentCount.classList.add(`hidden`);
commentsLoader.classList.add(`hidden`);
document.body.classList.add(`modal-open`);

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
  const picturesBlock = document.querySelector(`.pictures`);
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < photoDescription.length; i++) {
    fragment.appendChild(createPicture(photoDescription[i]));
  }
  picturesBlock.appendChild(fragment);
};

// Create and insert comments list for picture
const getCommentsList = (pictureComments) => {
  const commentsBlock = bigPictureContainer.querySelector(`.social__comments`);
  const commentItemTemplate = commentsBlock.querySelector(`.social__comment`);
  const fragment = document.createDocumentFragment();

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
  bigPictureContainer.classList.remove(`hidden`);
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
showBigPicture(photoDescription[0]);
