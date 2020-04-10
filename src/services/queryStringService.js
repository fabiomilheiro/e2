import queryString from "query-string";

function parse(locationSearch) {
  var { exactSearch, terms, groupId } = queryString.parse(locationSearch);

  return {
    exactSearch: exactSearch === "true" ? true : false,
    terms: terms,
    groupId: parseInt(groupId),
  };
}

export default {
  parse,
};
