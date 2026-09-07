import supertest from "supertest";
import { web } from "../src/application/web";
import { removeUser, disconnect, createUser, getUser } from "./util/util-test";
import { logger } from "../src/application/logging";
import bcrypt from "bcrypt";

describe("POST /api/users", function () {
  afterEach(async () => {
    await removeUser();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to register new user", async () => {
    const result = await supertest(web)
      .post("/api/users")
      .send({ username: "test", password: "secretPass", name: "Jake Smith" });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Jake Smith");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should not be able to register new user if username or password or name is empty", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should not be able to register new user if username already registered", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "secretPass",
      name: "Jake Smith",
    });
    result = await supertest(web).post("/api/users").send({
      username: "test1",
      password: "secretPass",
      name: "Jake Smith",
    });
    result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "secretPass12",
      name: "Caroline",
    });

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await createUser();
  });

  afterEach(async () => {
    await removeUser();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to login registered user", async () => {
    const result = await supertest(web)
      .post("/api/users/login")
      .send({ username: "test", password: "secretPass" });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe("Jacobs");
    expect(result.body.data.token).toBeDefined();
  });

  it("should not be able to login if username or password is wrong", async () => {
    let result = await supertest(web)
      .post("/api/users/login")
      .send({ username: "", password: "" });

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toContain("is not allowed to be empty");
  });

  it("should not be able to login if username or password is wrong", async () => {
    let result = await supertest(web)
      .post("/api/users/login")
      .send({ username: "test1", password: "secretPass" });

    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBe("username is wrong");

    result = await supertest(web)
      .post("/api/users/login")
      .send({ username: "test", password: "secretPass1" });

    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBe("password is wrong");
  });
});

describe("GET /api/users/current", () => {
  beforeEach(async () => {
    await createUser();
  });

  afterEach(async () => {
    await removeUser();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to get logged in user by token", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "sampleToken");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe("Jacobs");
    expect(result.body.data.username).toBe("test");
  });

  it("should not be able to get logged in user by token if it wrong", async () => {
    let result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "wrongToken");

    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBe("unauthorized");
  });
});

describe("PATCH /api/users/current", () => {
  beforeEach(async () => {
    await createUser();
  });

  afterEach(async () => {
    await removeUser();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to update logged in user by token", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "sampleToken")
      .send({
        name: "Bob",
        password: "secretPass21",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe("Bob");
    expect(result.body.data.username).toBe("test");
    const user = await getUser(result);
    expect(await bcrypt.compare("secretPass21", user.password)).toBe(true);
  });

  it("should be able to update logged in user, only name", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "sampleToken")
      .send({
        name: "Bob",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe("Bob");
    expect(result.body.data.username).toBe("test");
  });

  it("should be able to update logged in user, only name", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "sampleToken")
      .send({
        password: "secretPass21",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    const user = await getUser(result);
    expect(await bcrypt.compare("secretPass21", user.password)).toBe(true);
  });

  it("should not be able to update logged in user if token is invalid", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "sampleToken1")
      .send({
        name: "Bob",
        password: "secretPass21",
      });

    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBe("unauthorized");
  });
});

describe("DELETE /api/users/logout", () => {
  beforeEach(async () => {
    await createUser();
  });

  afterEach(async () => {
    await removeUser();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to log out user", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "sampleToken");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("Jacobs telah logout");
  });

  it("should not be able to log out user if token is wrong", async () => {
    let result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "wrongToken");

    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBe("unauthorized");
  });
});
