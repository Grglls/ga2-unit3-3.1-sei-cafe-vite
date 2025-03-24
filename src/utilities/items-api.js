import sendRequest from "./send-request";
const BASE_URL = '/api/items';

export async function getAll() {
  return sendRequest(BASE_URL);
}

// This function is never actually used in SEI-Cafe,
// it's only provided as a template for RESTful routing.
export async function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}
