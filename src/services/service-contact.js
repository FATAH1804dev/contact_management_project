import { validate } from "../validation/validation.js";
import {
  createContactValidation,
  getContactValidation,
  updateContactValidation,
  searchContactValidation,
} from "../validation/validation-contact.js";
import { prisma } from "../application/database.js";
import { responseError } from "../error/error-response.js";
import { logger } from "../application/logging.js";

const create = async (user, request) => {
  const contactUser = validate(createContactValidation, request);
  contactUser.username = user.username;

  return await prisma.contact.create({
    data: contactUser,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      username: true,
    },
  });
};

const get = async (user, request) => {
  const contactUser = validate(getContactValidation, request);

  const findContactInDatabase = await prisma.contact.findFirst({
    where: {
      username: user.username,
      id: contactUser,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      username: true,
    },
  });

  if (!findContactInDatabase) {
    throw new responseError(404, "contact not found");
  }

  return findContactInDatabase;
};

const update = async (user, request) => {
  const contactUser = validate(updateContactValidation, request);

  const findContactInDatabase = await prisma.contact.count({
    where: {
      id: contactUser.id,
      username: user.username,
    },
  });

  if (findContactInDatabase !== 1) {
    throw new responseError(404, "contact not found");
  }

  return await prisma.contact.update({
    where: {
      id: contactUser.id,
      username: user.username,
    },
    data: {
      firstName: contactUser.firstName,
      lastName: contactUser.lastName,
      email: contactUser.email,
      phone: contactUser.phone,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      username: true,
    },
  });
};

const remove = async (user, contactId) => {
  const contactUser = validate(getContactValidation, contactId);

  const findContactInDatabase = await prisma.contact.count({
    where: {
      id: contactUser,
      username: user.username,
    },
  });

  if (findContactInDatabase !== 1) {
    throw new responseError(404, "contact not found");
  }

  return await prisma.contact.delete({
    where: {
      id: contactUser,
    },
    select: {
      id: true,
      firstName: true,
      username: true,
    },
  });
};

const search = async (user, request) => {
  const contacts = validate(searchContactValidation, request);

  let filters = [];

  filters.push({
    username: user.username,
  });

  if (contacts.name) {
    filters.push({
      OR: [
        {
          firstName: {
            contains: contacts.name,
          },
        },
        {
          lastName: {
            contains: contacts.name,
          },
        },
      ],
    });
  }

  if (contacts.email) {
    filters.push({
      email: {
        contains: contacts.email,
      },
    });
  }

  if (contacts.phone) {
    filters.push({
      phone: {
        contains: contacts.phone,
      },
    });
  }

  const findContacts = await prisma.contact.findMany({
    where: {
      AND: filters,
    },
    take: contacts.size,
    skip: (contacts.page - 1) * contacts.size,
  });

  const countTotalContacts = await prisma.contact.count({
    where: {
      AND: filters,
    },
  });

  logger.info(findContacts);
  logger.info(countTotalContacts);

  return {
    data: findContacts,
    paging: {
      totalItem: countTotalContacts,
      page: contacts.page,
      totalPage: Math.ceil(countTotalContacts / contacts.size),
    },
  };
};
export default { create, get, update, remove, search };
