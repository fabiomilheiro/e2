import http from "./http";
import config from "./config";

async function getGroups() {
  const response = await http.get(`${config.apiBaseUrl}/groups`);

  return response.data;
}

export default {
  getGroups,
};
