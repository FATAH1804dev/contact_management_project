import { prisma } from "../../src/application/database.js";
import bcrypt from "bcrypt";

export const createUser = async () => {
  await prisma.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("secretPass", 10),
      name: "Jacobs",
      token: "sampleToken",
    },
  });
};

export const removeUser = async () => {
  await prisma.user.deleteMany({
    where: {
      username: {
        contains: "test",
      },
    },
  });
};

export const getUser = async (result) => {
  return prisma.user.findUnique({
    where: {
      username: result.body.data.username,
    },
  });
};

export const disconnect = async () => {
  await prisma.$disconnect();
};

export const removeContactsUser = async () => {
  await prisma.contact.deleteMany({
    where: {
      username: {
        contains: "test",
      },
    },
  });
};

export const createContact = async () => {
  await prisma.contact.create({
    data: {
      firstName: "Jacob",
      lastName: "Sanke",
      email: "jaco221@gmail.com",
      phone: "776435898",
      username: "test",
    },
  });
};

export const getContact = async () => {
  return await prisma.contact.findFirst({
    where: {
      username: "test",
    },
  });
};

export const getContacts = async (username) => {
  return await prisma.contact.findFirst({
    where: {
      username: username,
    },
  });
};

const users = [
  {
    username: "test",
    password: await bcrypt.hash("secretPass43", 10),
    name: "Jacob",
    token: "sampleToken34",
  },
  {
    username: "test1",
    password: await bcrypt.hash("secretPass21", 10),
    name: "Raymond",
    token: "sampleToken56",
  },
  {
    username: "test2",
    password: await bcrypt.hash("secretPass56", 10),
    name: "Ivan",
    token: "sampleToken78",
  },
];

export const createUsers = async () => {
  await prisma.user.createMany({
    data: users,
  });
};

export const createContacts = async () => {
  for (const user of users) {
    for (let i = 46; i < 51; i++) {
      await prisma.contact.create({
        data: {
          firstName: `${user.name}`,
          lastName: `test${i}`,
          email: `${user.name}${i}@gmail.com`,
          phone: `7738754${i}`,
          username: `${user.username}`,
        },
      });
    }
  }
};

export const createAddress = async () => {
  const contactId = await getContact();
  await prisma.address.create({
    data: {
      contactId: contactId.id,
      street: "Yamburg .St",
      city: "Fandtru",
      province: "Weryoi",
      country: "Molcev",
      postalCode: "335678",
    },
  });
};

export const createAddresses = async () => {
  for (const user of users) {
    for (let i = 48; i < 51; i++) {
      const contact = await getContacts(user.username);
      await prisma.address.create({
        data: {
          contactId: contact.id,
          street: `Yamburg${i} .St`,
          city: `Fandtru`,
          province: "Weryoi",
          country: "Molcev",
          postalCode: `335678${i}`,
        },
      });
    }
  }
};

export const removeAddress = async () => {
  const contactId = await getContact();
  await prisma.address.deleteMany({
    where: {
      contactId: contactId.id,
    },
  });
};

export const removeAddresses = async () => {
  for (const user of users) {
    const contact = await getContacts(user.username);
    await prisma.address.deleteMany({
      where: {
        contactId: contact.id,
      },
    });
  }
};

export const getAddress = async () => {
  const contactId = await getContact();
  return await prisma.address.findFirst({
    where: {
      contactId: contactId.id,
    },
  });
};
