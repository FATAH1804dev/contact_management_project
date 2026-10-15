import {
  disconnect,
  createUser,
  createUsers,
  removeUser,
  createContact,
  createContacts,
  getContact,
  getContacts,
  removeContactsUser,
  createAddress,
  createAddresses,
  getAddress,
  removeAddress,
  removeAddresses,
} from "./util/util-test";
import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/contacts/:contactId/address", () => {
  beforeEach(async () => {
    await createUser();
    await createContact();
  });

  afterEach(async () => {
    await removeAddress();
    await removeContactsUser();
    await removeUser();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to create address by token and contactId", async () => {
    const contactId = await getContact();

    const result = await supertest(web)
      .post("/api/contacts/" + contactId!.id + "/address")
      .set("Authorization", "sampleToken")
      .send({
        street: "Yamburg .St",
        city: "Fandtru",
        province: "Weryoi",
        country: "Molcev",
        postalCode: "335678",
      });
    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.contactId).toBeDefined();
    expect(result.body.data.street).toBe("Yamburg .St");
    expect(result.body.data.city).toBe("Fandtru");
    expect(result.body.data.province).toBe("Weryoi");
    expect(result.body.data.country).toBe("Molcev");
    expect(result.body.data.postalCode).toBe("335678");
  });

  it("should not be able to create address if request is invalid", async () => {
    const contactId = await getContact();

    const result = await supertest(web)
      .post("/api/contacts/" + contactId!.id + "/address")
      .set("Authorization", "sampleToken")
      .send({
        street: "Yamburg .St",
        city: "Fandtru",
        province: "Weryoi",
        country: "",
        postalCode: "",
      });
    logger.info(result.body);

    expect(result.status).toBe(400);
  });

  it("should not be able to create address if contact is not found", async () => {
    const contactId = await getContact();

    const result = await supertest(web)
      .post("/api/contacts/" + (contactId!.id + 1) + "/address")
      .set("Authorization", "sampleToken")
      .send({
        street: "Yamburg .St",
        city: "Fandtru",
        province: "Weryoi",
        country: "",
        postalCode: "",
      });
    logger.info(result.body);

    expect(result.status).toBe(404);
  });
});

describe("GET /api/contacts/:contactId/address/:addressId", () => {
  beforeEach(async () => {
    await createUser();
    await createContact();
    await createAddress();
  });

  afterEach(async () => {
    await removeAddress();
    await removeContactsUser();
    await removeUser();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to get address by token, contactId and addressId", async () => {
    const contactId = await getContact();
    const addressId = await getAddress();

    const result = await supertest(web)
      .get("/api/contacts/" + contactId!.id + "/address/" + addressId!.id)
      .set("Authorization", "sampleToken");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.contactId).toBeDefined();
    expect(result.body.data.street).toBe("Yamburg .St");
    expect(result.body.data.city).toBe("Fandtru");
    expect(result.body.data.province).toBe("Weryoi");
    expect(result.body.data.country).toBe("Molcev");
    expect(result.body.data.postalCode).toBe("335678");
  });

  it("should not be able to get address by token, contactId and addressId, if contactId is invalid", async () => {
    const contactId = await getContact();
    const addressId = await getAddress();

    const result = await supertest(web)
      .get("/api/contacts/" + (contactId!.id + 1) + "/address/" + addressId!.id)
      .set("Authorization", "sampleToken");

    logger.info(result.body);

    expect(result.status).toBe(404);
  });

  it("should not be able to get address by token, contactId and addressId, if addressId is invalid", async () => {
    const contactId = await getContact();
    const addressId = await getAddress();

    const result = await supertest(web)
      .get("/api/contacts/" + contactId!.id + "/address/" + (addressId!.id + 1))
      .set("Authorization", "sampleToken");

    logger.info(result.body);

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId/address/:addressId", () => {
  beforeEach(async () => {
    await createUser();
    await createContact();
    await createAddress();
  });

  afterEach(async () => {
    await removeAddress();
    await removeContactsUser();
    await removeUser();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to aupdate address by token, contactId and addressId", async () => {
    const contactId = await getContact();
    const addressId = await getAddress();

    const result = await supertest(web)
      .put("/api/contacts/" + contactId!.id + "/address/" + addressId!.id)
      .set("Authorization", "sampleToken")
      .send({
        street: "Jebsol .St",
        city: "Hokda",
        province: "Picxa",
        country: "Nwygut",
        postalCode: "786630",
      });

    logger.info(result.body);

    // expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.contactId).toBeDefined();
    expect(result.body.data.street).toBe("Jebsol .St");
    expect(result.body.data.city).toBe("Hokda");
    expect(result.body.data.province).toBe("Picxa");
    expect(result.body.data.country).toBe("Nwygut");
    expect(result.body.data.postalCode).toBe("786630");
  });

  it("should not be able to aupdate address by token, contactId and addressId, if request is invalid", async () => {
    const contactId = await getContact();
    const addressId = await getAddress();

    const result = await supertest(web)
      .put("/api/contacts/" + contactId!.id + "/address/" + addressId!.id)
      .set("Authorization", "sampleToken")
      .send({
        street: "Jebsol .St",
        city: "Hokda",
        province: "Picxa",
        country: "",
        postalCode: "",
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
  });

  it("should not be able to aupdate address by token, contactId and addressId, if address is not found", async () => {
    const contactId = await getContact();
    const addressId = await getAddress();

    const result = await supertest(web)
      .put("/api/contacts/" + contactId!.id + "/address/" + (addressId!.id + 1))
      .set("Authorization", "sampleToken")
      .send({
        street: "Jebsol .St",
        city: "Hokda",
        province: "Picxa",
        country: "Nwygut",
        postalCode: "786630",
      });

    logger.info(result.body);

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/contacts/:contactId/address/:addressId", () => {
  beforeEach(async () => {
    await createUser();
    await createContact();
    await createAddress();
  });

  afterEach(async () => {
    await removeAddress();
    await removeContactsUser();
    await removeUser();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to delete address by token, contactId and addressId", async () => {
    const contactId = await getContact();
    let addressId = await getAddress();

    const result = await supertest(web)
      .delete("/api/contacts/" + contactId!.id + "/address/" + addressId!.id)
      .set("Authorization", "sampleToken");

    logger.info(result.body);

    expect(result.status).toBe(200);
    addressId = await getAddress();
    expect(addressId).toBeNull();
  });

  it("should not be able to delete address by token, contactId and addressId if address not found", async () => {
    const contactId = await getContact();
    const addressId = await getAddress();

    const result = await supertest(web)
      .delete(
        "/api/contacts/" + contactId!.id + "/address/" + (addressId!.id + 1),
      )
      .set("Authorization", "sampleToken");

    logger.info(result.body);

    expect(result.status).toBe(404);
  });

  it("should not be able to delete address by token, contactId and addressId if contact not found", async () => {
    const contactId = await getContact();
    const addressId = await getAddress();

    const result = await supertest(web)
      .delete(
        "/api/contacts/" + (contactId!.id + 1) + "/address/" + addressId!.id,
      )
      .set("Authorization", "sampleToken");

    logger.info(result.body);

    expect(result.status).toBe(404);
  });
});

describe("GET /api/contacts/:contactId/address", () => {
  beforeEach(async () => {
    await createUsers();
    await createContacts();
    await createAddresses();
  });

  afterEach(async () => {
    await removeAddresses();
    await removeContactsUser();
    await removeUser();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to get all address by token and contactId", async () => {
    const contact = await getContacts("test2");

    const result = await supertest(web)
      .get("/api/contacts/" + contact!.id + "/address")
      .set("Authorization", "sampleToken78");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(3);
  });

  it("should not be able to get all address by token and contactId, if contact not found", async () => {
    const contact = await getContacts("test1");

    const result = await supertest(web)
      .get("/api/contacts/" + contact!.id + "/address")
      .set("Authorization", "sampleToken78");

    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("contact not found");
  });
});
