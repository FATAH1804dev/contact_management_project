import {
  removeUser,
  disconnect,
  createUser,
  getUser,
  createContact,
  removeContactsUser,
  getContact,
  createUsers,
  createContacts,
} from "./util/util-test";
import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await createUser();
  });

  afterEach(async () => {
    await removeContactsUser();
    await removeUser();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to create new contact from logged in user", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "sampleToken")
      .send({
        firstName: "Jacob",
        lastName: "Sanke",
        email: "jaco879@gmail.com",
        phone: "775768967",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.firstName).toBe("Jacob");
    expect(result.body.data.lastName).toBe("Sanke");
    expect(result.body.data.email).toBe("jaco879@gmail.com");
    expect(result.body.data.phone).toBe("775768967");
  });
  it("should not be able to create new contact if request is invalid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "sampleToken")
      .send({
        firstName: "",
        lastName: "Sanke",
        email: "jaco879gmail.com",
        phone: "775768967",
      });

    logger.info(result.body.errors);
    expect(result.status).toBe(400);
  });
});

describe("GET /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createUser();
    await createContact();
  });

  afterEach(async () => {
    await removeContactsUser();
    await removeUser();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to get contact by id", async () => {
    const contactId = await getContact();
    const result = await supertest(web)
      .get("/api/contacts/" + contactId!.id)
      .set("Authorization", "sampleToken");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.firstName).toBe("Jacob");
    expect(result.body.data.lastName).toBe("Sanke");
    expect(result.body.data.email).toBe("jaco221@gmail.com");
    expect(result.body.data.phone).toBe("776435898");
  });

  it("should not be able to get contact by id if id is not found", async () => {
    const contactId = await getContact();
    const result = await supertest(web)
      .get("/api/contacts/" + (contactId!.id + 1))
      .set("Authorization", "sampleToken");

    logger.info(result.body);
    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createUser();
    await createContact();
  });

  afterEach(async () => {
    await removeContactsUser();
    await removeUser();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to update contact by id", async () => {
    const contactId = await getContact();
    const result = await supertest(web)
      .put("/api/contacts/" + contactId!.id)
      .set("Authorization", "sampleToken")
      .send({
        firstName: "Darren",
        lastName: "Monk",
        email: "darr479@gmail.com",
        phone: "772354778",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.firstName).toBe("Darren");
    expect(result.body.data.lastName).toBe("Monk");
    expect(result.body.data.email).toBe("darr479@gmail.com");
    expect(result.body.data.phone).toBe("772354778");
  });

  it("should not be able to update contact by id if request is invalid", async () => {
    const contactId = await getContact();
    const result = await supertest(web)
      .put("/api/contacts/" + contactId!.id)
      .set("Authorization", "sampleToken")
      .send({
        firstName: "",
        lastName: "Monk",
        email: "darr4gmail.com",
        phone: "",
      });

    logger.info(result.body);
    expect(result.status).toBe(400);
  });

  it("should not be able to update contact by id if id is not found", async () => {
    const contactId = await getContact();
    const result = await supertest(web)
      .put("/api/contacts/" + (contactId!.id + 1))
      .set("Authorization", "sampleToken")
      .send({
        firstName: "Darren",
        lastName: "Monk",
        email: "darr479@gmail.com",
        phone: "772354778",
      });

    logger.info(result.body);
    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createUser();
    await createContact();
  });

  afterEach(async () => {
    await removeContactsUser();
    await removeUser();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to delete contact by id", async () => {
    let contactId = await getContact();
    const result = await supertest(web)
      .delete("/api/contacts/" + contactId!.id)
      .set("Authorization", "sampleToken");

    logger.info(result.body);
    expect(result.status).toBe(200);

    contactId = await getContact();
    expect(contactId).toBeNull();
  });

  it("should not be able to delete contact by id if id is not found", async () => {
    const contactId = await getContact();
    const result = await supertest(web)
      .delete("/api/contacts/" + (contactId!.id + 1))
      .set("Authorization", "sampleToken");

    logger.info(result.body);
    expect(result.status).toBe(404);
  });
});

describe("GET /api/contacts", () => {
  beforeEach(async () => {
    await createUsers();
    await createContacts();
  });

  afterEach(async () => {
    await removeContactsUser();
    await removeUser();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to get all contacts by search", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization", "sampleToken34");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(1);
    expect(result.body.paging.totalItem).toBe(5);
  });

  it("should be able to get all contacts by search and query", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        size: 2,
        page: 3,
      })
      .set("Authorization", "sampleToken56");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);
    expect(result.body.paging.page).toBe(3);
    expect(result.body.paging.totalPage).toBe(3);
    expect(result.body.paging.totalItem).toBe(5);
  });

  it("should be able to get all contacts by search and query v2", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        name: "test5",
      })
      .set("Authorization", "sampleToken78");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(1);
    expect(result.body.paging.totalItem).toBe(1);
  });

  it("should not be able to get all contacts by search if request invalid", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        size: 2,
        page: 3,
      })
      .set("Authorization", "sampleToken89");

    logger.info(result.body);
    expect(result.status).toBe(401);
  });
});
