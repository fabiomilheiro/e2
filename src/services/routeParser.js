function parsePersonSearchRouteParameters(params) {
  var { exactSearch, name, groupId } = params;

  return {
    exactSearch: exactSearch === "true" ? true : false,
    name: name || "",
    groupId: groupId ? parseInt(groupId) : "",
  };
}

export default {
  parsePersonSearchRouteParameters,
};
