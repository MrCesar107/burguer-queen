export default function authHeader() {
  // returns authorization header with a jwt token
  let waiter = JSON.parse(localStorage.getItem('waiter'));

  if (waiter && waiter.token) {
    return { 'Authorization': `bearer ${waiter.token}` };
  } else {
    return {};
  }
}
