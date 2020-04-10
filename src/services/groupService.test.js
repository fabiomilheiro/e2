import groupService from "./groupService";
import http from "./http";
import config from "./config";

jest.mock("./http");

describe("GroupService.GetGroups", () => {
  const groups = [
    { id: 1, name: "Administrators" },
    { id: 2, name: "Teachers" },
    { id: 3, name: "Students" },
  ];
  beforeEach(() => {
    http.get.mockImplementation((url) => {
      if (url !== `${config.apiBaseUrl}/groups`) {
        return null;
      }

      return Promise.resolve({ data: groups });
    });
  });

  test("Should return all groups", async () => {
    var result = await groupService.getGroups();

    expect(result).toEqual(groups);
  });
});
