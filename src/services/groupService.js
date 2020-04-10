import http from "./http";
import config from "./config";

const emptyOption = { key: "", value: "", text: "" };

async function getGroups() {
  const response = await http.get(`${config.apiBaseUrl}/groups`);

  return response.data;
}

async function getGroupOptions() {
  const groups = await getGroups();
  const groupOptions = groups.map((g) => ({
    key: g.id,
    value: g.id,
    text: g.name,
  }));

  return [emptyOption, ...groupOptions];
}

export default {
  getGroups,
  getGroupOptions,
};
