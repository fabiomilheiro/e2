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
    http.get = jest.fn();
    http.get.mockImplementation((url) => {
      debugger;
      if (!url.startsWith(`${config.apiBaseUrl}/persons`)) {
        return null;
      }

      return Promise.resolve({ data: persons });
    });
  });

  test("Returns all persons if no criteria", async () => {
    const response = await personService.getPersons();

    expect(response).toEqual(persons);
  });

  test("Filters by group", async () => {
    await personService.getPersons({ groupId: 999 });

    expect(http.get.mock.calls[0][0]).toContain("?groupId=999");
  });

  test("Filters by exact name", async () => {
    await personService.getPersons({ name: "john", exactSearch: true });

    expect(http.get.mock.calls[0][0]).toContain("?exactName=john");
  });

  test("Filters by partial name", async () => {
    await personService.getPersons({ name: "john", exactSearch: false });

    expect(http.get.mock.calls[0][0]).toContain("?partialName=john");
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
