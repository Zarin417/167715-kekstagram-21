'use strict';

(() => {
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

  // Get a random comment from user
  const getRandomComment = (comments, names) => {
    const comment = {
      avatar: `img/avatar-${window.util.getRandomInt(1, AVATARS_AMOUNT)}.svg`,
      message: comments[window.util.getRandomInt(0, comments.length - 1)],
      name: names[window.util.getRandomInt(0, names.length - 1)]
    };

    return comment;
  };

  // Get a random amount comments for one picture
  const getRandomAmountComments = (comments, names) => {
    let randomAmountComments = [];

    for (let i = 0; i < window.util.getRandomInt(1, AVATARS_AMOUNT); i++) {
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
        likes: window.util.getRandomInt(LIKES_MIN, LIKES_MAX),
        comments: getRandomAmountComments(comments, names)
      });
    }

    return photoDescriptionArray;
  };

  const photoDescriptionArray = getPhotoDescriptionArray(PHOTOS_DESCRIPTIONS, USERS_COMMENTS, USERS_NAMES);

  window.data = {
    photoDescription: photoDescriptionArray
  };
})();
