//export const BASE_URL = "http://localhost:3001"; // было https://api.lamarilu.nomoreparties.sbs , еще раньше было https://auth.nomoreparties.co
export const BASE_URL = 'https://api.lamarilu.nomoreparties.sbs';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Err: ${res.status}`);
};

export function registerUser(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse);
};

export function loginUser(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    //.then((data) => {
    //  localStorage.setItem('jwt', data.token)
    //  return data;
    //})
};

export function getToken() {
  const token = localStorage.getItem('jwt');

  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // вместо token был jwt
    },
  })
    .then(checkResponse);
};