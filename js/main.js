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

const descriptionsAmount = 25;
const avatarsAmount = 6;
const likesMin = 15;
const likesMax = 200;

// Get a random number in a given range
const getRandomInteger = (min, max) => {
  const randomInteger = min + Math.random() * (max + 1 - min);
  return Math.floor(randomInteger);
};

// Get a random comment from user
const getRandomComment = (comments, names) => {
  const comment = {
    avatar: `img/avatar-${getRandomInteger(0, avatarsAmount - 1)}.svg`,
    message: comments[getRandomInteger(0, comments.length - 1)],
    name: names[getRandomInteger(0, names.length - 1)]
  };
  return comment;
};

// Get a random amount comments for one picture
const getRandomAmountComments = (comments, names) => {
  const randomAmountComments = [];

  for (let i = 0; i < getRandomInteger(1, avatarsAmount); i++) {
    randomAmountComments.push(getRandomComment(comments, names));
  }
  return randomAmountComments;
};

// Create description for photos
const getPhotoDescriptionArray = (description, comments, names) => {
  let photoDescriptionArray = [];

  for (let i = 0; i < descriptionsAmount; i++) {
    photoDescriptionArray.push({
      url: `photos/${i + 1}.jpg`,
      description: `${description[i]}`,
      likes: getRandomInteger(likesMin, likesMax),
      comments: getRandomAmountComments(comments, names)
    });
  }
  return photoDescriptionArray;
};

const photoDescription = getPhotoDescriptionArray(PHOTOS_DESCRIPTIONS, USERS_COMMENTS, USERS_NAMES);

// Create DOM-element based on template
const pictureTemplate = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);

const createPicture = (descriptionItem) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const commentsLength = descriptionItem.comments.length;
  pictureElement.querySelector(`.picture__img`).src = descriptionItem.url;
  pictureElement.querySelector(`.picture__img`).alt = descriptionItem.description;
  pictureElement.querySelector(`.picture__likes`).textContent = descriptionItem.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = commentsLength.toString();
  return pictureElement;
};

const fragment = document.createDocumentFragment();

for (let i = 0; i < photoDescription.length; i++) {
  fragment.appendChild(createPicture(photoDescription[i]));
}

const picturesBlock = document.querySelector(`.pictures`);
picturesBlock.appendChild(fragment);
