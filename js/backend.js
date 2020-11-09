'use strict';

(() => {
  const TIMEOUT = 10000;
  const RequestType = {
    GET: `GET`,
    POST: `POST`
  };
  const Url = {
    GET: `https://21.javascript.pages.academy/kekstagram/data`
  };
  const StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };
  const StatusText = {
    400: `Ошибка в запросе`,
    404: `Запрашиваемые данные не найдены`,
    500: `Сервер не может обработать запрос`
  };

  const createRequest = (type, url, onSuccess, onError, data, optionalArg) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(type, url);

    xhr.addEventListener(`load`, function () {
      let error;

      switch (xhr.status) {
        case StatusCode.OK:
          if (document.querySelector(`.error-message`)) {
            document.querySelector(`.error-message`).remove();
          }
          if (type === `GET`) {
            onSuccess(xhr.response, optionalArg);
          } else {
            onSuccess();
          }
          break;

        case StatusCode.BAD_REQUEST:
          error = StatusText[`400`];
          break;

        case StatusCode.NOT_FOUND:
          error = StatusText[`404`];
          break;

        case StatusCode.SERVER_ERROR:
          error = StatusText[`500`];
          break;

        default:
          error = `Статус ответа: ${xhr.status} ${xhr.statusText}`;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
    });

    xhr.timeout = TIMEOUT;

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  const loadData = (onLoad, onError, optionalArg) => {
    createRequest(RequestType.GET, Url.GET, onLoad, onError, null, optionalArg);
  };

  window.backend = {
    load: loadData
  };
})();
