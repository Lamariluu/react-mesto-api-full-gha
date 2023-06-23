class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  //загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "GET",
    })
      .then(this._checkResponse);
  }

  //получить информацию о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "GET",
    })
      .then(this._checkResponse);
  }

  //редактировать профиль
  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);
  }

  //добавить новую карточку
  createItem(data) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
      .then(this._checkResponse);
  }

  //удалить карточку
  deleteItem(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(this._checkResponse);
  }

  //поставить лайк
  addLike(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
    })
      .then(this._checkResponse);
  }

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
      .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    //при ошибке отклоняем Promise
    return Promise.reject(`Ошибка в запросе: ${res.status}`)
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
    authorization: '66152526-e3a2-499d-83aa-0c2a001d63c8',
    'Content-Type': 'application/json'
  }
});

export default api;
