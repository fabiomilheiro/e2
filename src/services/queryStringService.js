import queryString from "query-string";

function parse(locationSearch) {
  var { exactSearch, name, groupId } = queryString.parse(locationSearch);

  return {
    exactSearch: exactSearch === "true" ? true : false,
    name: name || "",
    groupId: parseInt(groupId),
  };
}

export default {
  parse,
};
