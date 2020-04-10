import http from "./http";
import config from "./config";
import queryString from "query-string";

async function getPersons(criteria) {
  const url = addQueryStringParameters(criteria);

  const response = await http.get(url);
  return response.data;
}

function addQueryStringParameters(criteria) {
  let url = `${config.apiBaseUrl}/persons`;

  let searchParameters = {};
  if (criteria) {
    if (criteria.groupId) {
      searchParameters.groupId = criteria.groupId;
    }
    if (criteria.name) {
      searchParameters[criteria.exactSearch ? "exactName" : "partialName"] =
        criteria.name;
    }

    url += `?${queryString.stringify(searchParameters)}`;
  }
  return url;
}

async function addPerson(requestBody) {
  const response = await http.post(`${config.apiBaseUrl}/persons`, requestBody);

  return response.data;
}

export default {
  getPersons,
  addPerson,
};
