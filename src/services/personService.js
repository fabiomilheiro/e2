import http from "./http";
import config from "./config";

async function getPersons() {
  const response = await http.get(`${config.apiBaseUrl}/persons`);

  return response.data;
}

async function addPerson(requestBody) {
  const response = await http.post(`${config.apiBaseUrl}/persons`, requestBody);

  return response.data;
}

export default {
  getPersons,
  addPerson,
};
