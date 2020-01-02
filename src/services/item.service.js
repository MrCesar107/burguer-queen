import { authHeader } from '../helpers';
const apiUrl = process.env.API_URL || 'http://localhost:4000';


export const itemService = {
  create,
  update,
  deleteMenu,
  getAll,
};

function logout() {
  localStorage.removeItem('waiter');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${apiUrl}/api/v1/items`, requestOptions)
    .then(handleResponse);
}

function create(item) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  };

  return fetch(`${apiUrl}/api/v1/items/create`, requestOptions)
    .then(handleResponse);
}

function update(item) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  };

  return fetch(`${apiUrl}/api/v1/items/update/${item.id}`, requestOptions)
    .then(handleResponse);
}

function deleteMenu(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };

  return fetch(`${apiUrl}/api/v1/items/delete/${id}`, requestOptions)
    .then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if(!response.ok) {
      if(response.status === 401) {
        logout();
        // eslint-disable-next-line no-restricted-globals
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
