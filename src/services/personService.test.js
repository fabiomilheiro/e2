import personService from "./personService";
import http from "./http";
import config from "./config";

jest.mock("./http");

describe("PersonService.GetPersons", () => {
  const persons = [
    {
      id: 1,
      name: "John Smith",
      createdTimestamp: "2020-04-01T00:00:00.0000000",
      groupName: "Administrator",
    },
    {
      id: 10,
      name: "Arnold",
      createdTimestamp: "2020-04-08T00:00:00.0000000",
      groupName: "Teacher",
    },
  ];
  beforeEach(() => {
    http.get.mockImplementation((url) => {
      if (url !== `${config.apiBaseUrl}/persons`) {
        return null;
      }

      return Promise.resolve({ data: persons });
    });
  });

  test("Returns persons", async () => {
    const response = await personService.getPersons();

    expect(response).toEqual(persons);
  });
});

describe("PersonService.AddPerson", () => {
  beforeEach(() => {
    http.post.mockImplementation((url, body) => {
      if (url !== `${config.apiBaseUrl}/persons`) {
        return null;
      }

      return Promise.resolve({
        data: {
          id: 1000,
          name: body.name,
          createdTimestamp: "2020-04-01T00:00:00.0000000",
          groupName: "Administrators",
        },
      });
    });
  });

  test("Returns persons", async () => {
    const requestBody = {
      name: "Arnold",
      groupId: 1,
    };
    const response = await personService.addPerson(requestBody);

    expect(response).toEqual({
      id: 1000,
      name: "Arnold",
      createdTimestamp: "2020-04-01T00:00:00.0000000",
      groupName: "Administrators",
    });
  });
});
