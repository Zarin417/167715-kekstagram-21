'use strict';

(() => {
  const TIMEOUT = 10000;
  const RequestType = {
    GET: `GET`,
    POST: `POST`
  };
  const Url = {
    GET: `https://21.javascript.pages.academy/kekstagram/data`,
    POST: `https://21.javascript.pages.academy/kekstagram`
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

  const createRequest = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      let error;

      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          break;

        case StatusCode.BAD_REQUEST:
          error = StatusText[StatusCode.BAD_REQUEST];
          break;

        case StatusCode.NOT_FOUND:
          error = StatusText[StatusCode.NOT_FOUND];
          break;

        case StatusCode.SERVER_ERROR:
          error = StatusText[StatusCode.SERVER_ERROR];
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
    return xhr;
  };

  const loadData = (onSuccess, onError) => {
    const xhr = createRequest(onSuccess, onError);

    xhr.open(RequestType.GET, Url.GET);
    xhr.send();
  };

  const saveData = (onSuccess, onError, data) => {
    const xhr = createRequest(onSuccess, onError);
    xhr.open(RequestType.POST, Url.POST);
    xhr.send(data);
  };

  window.backend = {
    loadData,
    saveData
  };
})();
