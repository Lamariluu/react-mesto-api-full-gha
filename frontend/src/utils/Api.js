class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    //this._headers = options.headers
  }

  //загрузка карточек с сервера
  getInitialCards() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }, //было this.headers,
      method: "GET",
    })
      .then(this._checkResponse);
  }

  //получить информацию о пользователе
  getUserInfo() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }, //было this.headers,
      method: "GET",
    })
      .then(this._checkResponse);
  }

  //редактировать профиль
  setUserInfo({ name, about }) { // было setUserInfo(data)
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }, //было this.headers,
      method: 'PATCH',
      body: JSON.stringify({
        name, // было name: data.name,
        about, // было about: data.about
    })
    })
      .then(this._checkResponse);
  }

  //добавить новую карточку
  createItem({ name, link }) { // было createItem(data)
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }, //было this.headers,
      method: 'POST',
      body: JSON.stringify({
        name, // было name: data.name
        link, // было link: data.link
      })
    })
      .then(this._checkResponse);
  }

  //удалить карточку
  deleteItem(cardId) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }, // было this.headers
      method: 'DELETE',
    })
      .then(this._checkResponse);
  }

  //поставить лайк
  addLike(cardId, isLiked) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }, // было this.headers
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
    })
      .then(this._checkResponse);
  }

  setUserAvatar({ avatar }) {  // было setUserAvatar(data)
    const token = localStorage.getItem('jwt');

    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }, // было this.headers
      method: 'PATCH',
      body: JSON.stringify({
        avatar, // было avatar: data.avatar,
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
  //baseUrl: 'http://localhost:3001', // было https://mesto.nomoreparties.co/v1/cohort-60
  baseUrl: 'https://api.lamarilu.nomoreparties.sbs'
  //headers: {
  //  authorization: '66152526-e3a2-499d-83aa-0c2a001d63c8',
  //  'Content-Type': 'application/json'
  //}
});

export default api;
