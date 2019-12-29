import config from 'config';

export const waiterService = {
  login,
  logout,
  register,
};

async function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${config.apiUrl}/api/v1/waiters/login`, requestOptions)
    .then(handleResponse)
    .then(waiter => {
      // Store waiter details and jwt token in local storage to keep user
      // logged in between pages refreshes
      localStorage.setItem('water', JSON.stringify(waiter));
      return waiter;
    });
}

function logout() {
  // Remove waiter data from localstorage to log waiter out
  localStorage.removeItem('waiter');
}

function register(waiter) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(waiter),
  };

  return fetch(`${config.apiUrl}/api/v1/waiters/register`, requestOptions)
    .then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if(!response.ok) {
      if(response.status === 401) {
        // Auto logout
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
