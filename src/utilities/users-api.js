// This is the base path of the Express route:
const BASE_URL = '/api/users'

export async function signUp(userData) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  
  // Check if request was successful (status code in the 200s):
  if (res.ok) {
    // res.json() will resolve to the JWT
    return res.json();
  } else {
    throw new Error('Invalid Sign Up');
  }
}

export async function login(credentials) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });

  // Check if request was successful (status code in the 200s):
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Invalid Log In');
  }
}